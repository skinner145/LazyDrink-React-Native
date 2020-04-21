/**
 * @Author: Arthur Skinner
 * @Date:   2020-03-06T16:42:53+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-10T19:56:00+00:00
 */



import React, { useEffect, useState, useReducer, useCallback } from 'react';
import { Alert, ActivityIndicator, ScrollView, View, KeyboardAvoidingView, TextInput, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const UPDATE_INPUT = 'UPDATE_INPUT';

const formReducer = (state, action) => {
    if(action.type === UPDATE_INPUT){
        const updatedValues = {
            ...state.input,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return{
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            input: updatedValues
        }
    }
    return state;
}


const Login =(props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch();

    const [form, dispatchFormState] = useReducer(formReducer, {
        input: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(error){
            Alert.alert('An error occurred', error, [{text: 'OK'}]);
        }
    }, [error]);

    const authHandler = async () => {
        let action = authActions.signin(
                email,
                password
            )
          setError(null)
        setIsLoading(true);
        try{
            await dispatch(action);
        }
        catch(err){
            setError(err.message)
        }
        setIsLoading(false)
    }

    const inputChangeHandler = useCallback(
        (inputIndentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: UPDATE_INPUT,
                value: inputValue,
                isValid: inputValidity,
                input: inputIndentifier
            });
        },
        [dispatchFormState]
    )
    return (
        <View
            style={styles.screen}
            behavior="padding"
            keyboardVerticalOffset={50}
            >
            <View style={styles.authContainer}>
              <Text style={styles.title}>Log in</Text>
              <Text style={styles.inputHeader}>Email</Text>
              <View style={styles.inputs}>
                <TextInput
                  id="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={text=>setEmail(text)}
                />
                </View>
                <Text style={styles.inputHeader}>Password</Text>
                <View style={styles.inputs}>
                <TextInput
                  id="password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                </View>

                {isLoading ? (
                        <ActivityIndicator size="small" color={Colors.secondary} />
                    ):(<View style={styles.button}>
                        <Button
                        title='Login'
                        color={Colors.secondary}
                        onPress={authHandler}
                    />
                    </View>
                    )}
                    <View style={styles.button}>
                    <Text style={styles.inputHeader}>Don't have an account?</Text>
                    <Button
                        title='Register Account'
                        color={Colors.primary}
                        onPress={() => {
                            props.setIsSignUp(true)
                        }}
                    />
                  </View>
                </View>
        </View>

    )
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -35
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
    inputs: {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 2,
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 20,
      borderColor: Colors.secondary,
      borderWidth: 1,
      height: 50
    },
    button: {
      padding: 10
    },
    title: {
      fontSize: 30,
      fontFamily: 'RobotoCondensed-Regular'
    },
    inputHeader: {
      fontFamily: 'RobotoCondensed-Regular'
    }
})

export default Login;
