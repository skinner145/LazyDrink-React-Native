/**
 * @Author: Arthur Skinner
 * @Date:   2020-01-28T14:50:04+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-10T19:41:40+00:00
 */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk';
import {
  SQIPCore,
} from 'react-native-square-in-app-payments';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import typeReducer from './store/reducers/type';
import authReducer from './store/reducers/auth'
import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  type: typeReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
//
const fetchFonts = () =>{
  return Font.loadAsync({
  'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

}

export default function App() {
  useEffect(async () => {
    await SQIPCore.setSquareApplicationId('sandbox-sq0idb-mXsrCWQkLXJJOYpVlFx5sQ');
  }, [])
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
