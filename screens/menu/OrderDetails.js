import React from 'react';
import { View, Text, ScrollView, FlatList, Button, StyleSheet } from 'react-native';
import {ListItem} from 'react-native-elements';
import { useDispatch } from 'react-redux'
import moment from 'moment';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors'

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
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.info}>Table: {order.tableNumber}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.itemList}>
          <FlatList
                 data={order.drinks}
                 keyExtractor={item => item.id}
                 renderItem={({item}) => (
                   <View style={styles.list}>
                     <ListItem
                       title={item.drink.name}
                       subtitle={item.quantity + ' x $' +item.drink.price.toFixed(2)}
                       rightTitle={'$' + item.sum.toFixed(2)}
                     />
                   </View>
                 )}
               />
        </View>
        <View style={styles.footer}>
          <Text style={styles.info}>Total: ${order.totalPrice.toFixed(2)}</Text>
          <Button
          title="Re-Order"
          color={Colors.secondary}
          onPress={() => {
            dispatch(ordersActions.storeOrder(cartItems, tableNumber, totalPrice))
            navigation.navigate('Payment');
          }}
          />
        </View>
      </View>
    </View>
  )
}

export const screenOptions = navData => {
  return{
    headerTitle: 'Order Details'
  }
}

const styles= StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    marginTop: -60,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemList: {
    maxHeight: 300,
    borderTopWidth: 1,
    borderColor: Colors.divider
  },
  date:{
    fontSize: 16,
    fontFamily: 'Roboto-Thin'
  },
  footer: {
    marginTop: 10
  },
  title: {
    fontSize: 28,
    fontFamily: 'RobotoCondensed-Regular'
  },
  container: {
    borderWidth: 1,
    borderColor: Colors.divider,
    width: '80%',
    borderRadius: 10,
    padding: 15,
    maxHeight: 500
  },
  tabletime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  items: {
  },
  list: {
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  info: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16
  },
  total: {
    fontFamily: 'Roboto-Thin',
    fontSize: 1
  },
  reorder: {
    marginTop: 5
  },
  listContainer: {

  }
});

export default OrderDetails;
