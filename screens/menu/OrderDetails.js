import React from 'react';
import { View, Text, ScrollView, FlatList, Button } from 'react-native';
import {ListItem} from 'react-native-elements';
import { useDispatch } from 'react-redux'
import moment from 'moment';
import * as ordersActions from '../../store/actions/orders';

const OrderDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  let order = route.params.order;

  let drinks = order.drinks
  const cartItems = [];
  for(const key in drinks){
    cartItems.push({
      productId: drinks[key].drink._id,
      productTitle: drinks[key].drink.name,
      price: drinks[key].price,
      quantity: drinks[key].quantity,
      sum: drinks[key].sum
    })
  }
  const tableNumber = order.tableNumber;
  const totalPrice = order.totalPrice;
  const date = moment(order.date).format('HH:mm, DD/MM/YYYY');

  return (
    <View>
      <Text>Order #{order.number}</Text>
      <Text>{date}</Text>
      <FlatList
        data={order.drinks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ListItem
            title={item.drink.name}
            subtitle={item.quantity + ' x $' +item.drink.price.toFixed(2)}
            rightTitle={'$' + item.sum.toFixed(2)}
          />
        )}
      />
      <Text>Table: {order.tableNumber}</Text>
      <Text>Total: {order.totalPrice.toFixed(2)}</Text>
      <Button
        title="Re-Order"
        onPress={() => {
          dispatch(ordersActions.storeOrder(cartItems, tableNumber, totalPrice))
          navigation.navigate('Payment');
        }}
        />
    </View>
  )
}

export default OrderDetails;
