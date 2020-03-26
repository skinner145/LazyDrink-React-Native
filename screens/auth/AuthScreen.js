/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-28T18:27:10+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-10T16:56:38+00:00
 */



import React, { useState, useReducer, useCallback } from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/UI/Input'
import Card from'../../components/UI/Card';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import { LinearGradient } from 'expo-linear-gradient';
import * as authActions from '../../store/actions/auth';
import Register from './Register';
import Login from './Login'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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


const AuthScreen = (props, {navigation}) => {
    const [isSignUp, setIsSignUp] = useState(false)
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
    if(isSignUp){
        return (
            <Register  setIsSignUp={setIsSignUp}/>
        )
    }
    else{
        return(
            <Login  setIsSignUp={setIsSignUp}/>
        )
    }

}

export const screenOptions = navData => {
    return{
        headerTitle: 'Lazy Drink',
    }
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

export default AuthScreen;
