import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet, Button, Picker, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import ListTables from '../../components/shop/ListTables';
import { test } from '../payment/Payment'
import SyncStorage from 'sync-storage';

const Cart = ({navigation}) => {
    const dispatch = useDispatch();
    const tables = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
    const [table, setTable] = useState(1);
    const [modalVisible, setModalVisible] = useState(false)
    const cartTotalPrice = useSelector(state => state.cart.totalPrice);
    const selectedTable = table
    console.log(selectedTable);

    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                price: state.cart.items[key].price,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }

        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });
    const totalPrice = useSelector(state => {
      return state.cart.totalPrice
    });
return(
    <View style={styles.screen}>
        <View style={styles.summary} >
            <Button
                title="Proceed to Checkout"
                color={Colors.secondary}
                disabled={cartItems.length === 0}
                onPress={() => {
                  dispatch(ordersActions.storeOrder(cartItems, table, totalPrice))
                  navigation.navigate('Payment')
                }}
                />
        </View>
        <View>
        <Picker selectedValue={table}
            onValueChange={(itemValue) => {
                setTable(itemValue)
            }}
        >
            {tables.map(table => {
                return (
                <Picker.Item
                    key={table}
                    value={table}
                    label={table.toString()}
                    />
                )
            })}
        </Picker>
        </View>
        <View>
            <FlatList
            data={cartItems}
            keyExtractor={item => item.productId}
            renderItem={itemData =>
            <CartItem
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            price={itemData.item.price}
            deletable
            onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId))
            }}
            />
            } />
        </View>
        <View>
        <Text>Total:€ {cartTotalPrice.toFixed(2)}</Text>
        </View>
        <Modal
          animationType="slide"
          visible={modalVisible}
        >
          <Text>hi</Text>
        </Modal>
    </View>
)
}
// const ListTables = props => {
//     const dispatch = useDispatch();
//     const tables = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
//     const [table, setTable] = useState(1);
//     return(
        // <Picker selectedValue={table}
        //     onValueChange={(itemValue) => {
        //         setTable(itemValue)
        //     }}
        // >
        //     {tables.map(table => {
        //         return (
        //         <Picker.Item
        //             key={table}
        //             value={table}
        //             label={table.toString()}
        //             />
        //         )
        //     })}
        // </Picker>
//     )
// }

export const screenOptions = {
    headerTitle: 'Cart'
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    text:{
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount:{
        color: Colors.secondary
    }
});

export default Cart;
