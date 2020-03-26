import React, { useEffect, useState, useReducer, useCallback } from 'react';
import { Alert, ActivityIndicator, ScrollView, View, KeyboardAvoidingView, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/UI/Input'
import Card from'../../components/UI/Card';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
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


const Register = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch();

    const [form, dispatchFormState] = useReducer(formReducer, {
        input: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        inputValidities: {
            firstName: false,
            lastName: false,
            email: false,
            password: false
        },
        formIsValid: false
    })

    useEffect(() => {
        if(error){
            Alert.alert('An error occurred', error, [{text: 'OK'}]);
        }
    }, [error]);

    const authHandler = async () => {
        let action = authActions.signup(
                form.input.firstName,
                form.input.lastName,
                form.input.email,
                form.input.password
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

            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input
                        id="firstName"
                        label="First Name"
                        keyboardType="default"
                        required
                        errorMessage="default"
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    <Input
                        id="lastName"
                        label="Last Name"
                        keyboardType="default"
                        required
                        errorMessage="Email invalid"
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    <Input
                        id="email"
                        label="Email"
                        keyboardType="email-address"
                        required
                        autoCapitalize="none"
                        errorMessage="Email invalid"
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    <Input
                        id="password"
                        label="Password"
                        keyboardType="default"
                        secureTextEntry
                        required
                        minLegth={6}
                        autoCapitalize="none"
                        errorMessage="Password invalid"
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />{isLoading ? (
                        <ActivityIndicator size="small" color={Colors.secondary} />
                    ):(
                        <Button
                        title='Register'
                        color={Colors.secondary}
                        onPress={authHandler}
                    />
                    )}
                    <Button
                        title='Switch to Login'
                        color={Colors.primary}
                        onPress={() => {
                            props.setIsSignUp(false)
                        }}
                    />

                </ScrollView>
            </Card>
        </View>

    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradients: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Register;
