import React, { useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements'
import moment from 'moment'

const Orders = ({navigation}) => {
  // console.log(this.props.navigation.state.params.success);
  const userId = useSelector(state => {
    return state.auth.userId
  })




  const dispatch = useDispatch();
  useEffect(() => console.log('updating'))
  useEffect(() => {
      dispatch(ordersActions.getOrder(userId))
  }, [])
  //
  let orders = useSelector(state => {
    return state.orders.orders
  })

    return (
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {navigation.navigate('OrderDetails', {order: item})}}
          >
            <ListItem
              title={'Order #' + item.number}
              subtitle={'Table: ' + item.tableNumber}
              rightTitle={'$' + item.totalPrice.toFixed(2)}
              rightSubtitle={moment(item.date).format('HH:mm, DD/MM')}
              bottomDivider
              chevron />
          </TouchableOpacity>
        )}
      />
    )


    // return (
    // <FlatList
    //     data={orders}
    //     keyExtractor={item => item.id}
    //     renderItem={itemData =>
    //     <OrderItem
    //         price={itemData.item.price}
    //         date={itemData.item.readableDate}
    //         items={itemData.item.items}
    //     />
    //     }
    // />)
}

export const screenOptions = navData => {
    return {
        headerTitle: 'Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu"
                iconName={'md-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}  />
            </HeaderButtons>
        )
    }
};

export default Orders;
