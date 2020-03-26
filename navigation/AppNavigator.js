/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-24T17:44:15+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-10T19:52:03+00:00
 */


// import 'react-native-gesture-handler';
import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native'
//
import { NavigationContainer } from '@react-navigation/native';
import { ShopNavigator, AuthNavigator } from './ShopNavigator';



const AppNavigator = props => {
  // let is = useSelector(state => state.auth.token)
const isAuth = useSelector(state => !!state.auth.token);

    return (
    <NavigationContainer>
      {isAuth && (
        <ShopNavigator />
      )}
      {!isAuth && (
        <AuthNavigator />
      )}

    </NavigationContainer>
    )
}

export default AppNavigator
