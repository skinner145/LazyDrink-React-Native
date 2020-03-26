/**
 * @Author: Arthur Skinner
 * @Date:   2020-03-03T10:10:38+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-10T19:54:12+00:00
 */



import axios from "axios"
import { AsyncStorage } from 'react-native';
export const AUTHENTICATE = 'AUTHENTICATE'
export const SIGNUP = 'SIGNUP'
export const SIGNIN = 'SIGNIN'
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const LOGOUT = 'LOGOUT'


export const authenticate = (token) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, token: token });
  };
};

export const signup = (firstName, lastName, email, password) => {
    return  async dispatch => {
        let user = {
            firstName:  firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        const response = await axios.post('http://192.168.1.14:4000/user/register', user)
        // .then(console.log('User added succesfully'))
        // .catch(err => console.log(err))
        console.log(response.data.success);

        if(response.data.success === false){
            const errorResData = await response
            const errorId = errorResData.error;
            let message = 'Something went wrong';
            throw new Error(message)
        }
        const resData = await response
        let token = resData.data.token
        let userId = resData.data.userId
        dispatch({type: SIGNUP, userData: user, token: token, userId: userId})
    }
}

export const signin = (email, password) => {
    return  async dispatch => {
        let user = {
            email: email,
            password: password
        }
        const response = await axios.post('http://192.168.1.14:4000/user/login', user)
        // .then(console.log('User added succesfully'))
        // .catch(err => console.log(err))
        console.log(response.data.success);

        if(response.data.success === false){
            const errorResData = await response
            const errorId = errorResData.error;
            let message = 'Something went wrong';
            throw new Error(message)
        }
        const resData = await response
        let token = resData.data.token
        let userId = resData.data.userId
        saveDatatoStorage(token)

        dispatch({type: SIGNIN, userData: user, token: token, userId: userId})
    }
}

export const logout = () => {
  return { type: LOGOUT };
}

const saveDatatoStorage = token => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token
    })
  )
}
