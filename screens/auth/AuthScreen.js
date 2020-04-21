/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-28T18:27:10+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-10T16:56:38+00:00
 */



import React, { useState } from 'react';

import Register from './Register';
import Login from './Login';


const AuthScreen = (props, {navigation}) => {
    const [isSignUp, setIsSignUp] = useState(false)

    if(isSignUp){
        return (
            <Register  setIsSignUp={setIsSignUp}/>
        )
    }
    else{
        return(
            <Login setIsSignUp={setIsSignUp}/>
        )
    }

}

export const screenOptions = navData => {
    return{
        headerTitle: 'Lazy Drink',
    }
}

export default AuthScreen;
