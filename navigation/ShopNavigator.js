import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Platform } from 'react-native';

import { View, Button, Text } from 'react-native'
import MainMenu, {screenOptions as mainMenuScreenOptions} from '../screens/menu/MainMenu';
import Menu, { screenOptions as menuScreenOptions } from '../screens/menu/Menu';
import Colors from '../constants/Colors';
import Cart, { screenOptions as cartScreenOptions, screenOptions} from '../screens/menu/Cart';
import Orders, {screenOptions as ordersScreenOptions} from '../screens/menu/Orders';
import OrderDetails, {screenOptions as orderDetailsScreenOptions} from '../screens/menu/OrderDetails';
import Payment from '../screens/payment/Payment';
import AuthScreen, {screenOptions as authScreenOptions} from '../screens/auth/AuthScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as authActions from '../store/actions/auth';
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsStackNavigator = createStackNavigator();
export const ProductsNavigator = () => {
    return(
        <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProductsStackNavigator.Screen
                name="MainMenu"
                component={MainMenu}
                options={mainMenuScreenOptions}
                />
            <ProductsStackNavigator.Screen
                name ="Menu"
                component={Menu}
                options={menuScreenOptions}
                />
            <ProductsStackNavigator.Screen
                name="Cart"
                component={Cart}
                options={cartScreenOptions}
                />
            <ProductsStackNavigator.Screen
                name="Payment"
                component={Payment}
                />
        </ProductsStackNavigator.Navigator>
    )
}
const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return(
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <OrdersStackNavigator.Screen
                name="Orders"
                component={Orders}
                options={ordersScreenOptions}
                 />
              <OrdersStackNavigator.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={orderDetailsScreenOptions}
              />
        </OrdersStackNavigator.Navigator>
    )
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return(
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={authScreenOptions} />
        </AuthStackNavigator.Navigator>
    )
}

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
    return(
        <ShopDrawerNavigator.Navigator
        drawerContent={props => {
            return(
                <View style={{flex: 1, paddingTop: 20}}>
                    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                        <DrawerItemList {...props} />
                        <Button
                          title="Logout"
                          color="red"
                          onPress={()=>{dispatch(authActions.logout())}}
                        />
                    </SafeAreaView>
                </View>
            )
        }}
        drawerContentOptions={{
            activeTintColor: Colors.primary
        }}
        >
            <ShopDrawerNavigator.Screen
                name="Menu"
                component={ProductsNavigator}
                options={{
                    drawerIcon: props => (
                        <Icon
                            name='list'
                        />
                    )
                }}
                />
            <ShopDrawerNavigator.Screen
                name="Orders"
                component={OrdersNavigator}
                options={{
                    drawerIcon: props => (
                        <Icon
                            name='clock'
                        />
                    )
                }}
                />
        </ShopDrawerNavigator.Navigator>
    )
}
