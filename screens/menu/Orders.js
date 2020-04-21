import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator,TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ordersActions from '../../store/actions/orders'
import ListItem from '../../components/UI/ListItem';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment'
import Colors from '../../constants/Colors'

const Orders = ({navigation}) => {
  // console.log(this.props.navigation.state.params.success);
  const userId = useSelector(state => {
    return state.auth.userId
  })


const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
      const loadOrders = async () => {
        setIsLoaded(false)
        await dispatch(ordersActions.getOrder(userId))
        setIsLoaded(true)
      }
      loadOrders();
  }, [dispatch])
  //
  let orders = useSelector(state => {
    return state.orders.orders
  })

  if(isLoaded){
    return (
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {navigation.navigate('OrderDetails', {order: item})}}
          >
            <ListItem
              leftMain={'Order #' + item.number}
              rightMain={item.totalPrice}
              leftSub={moment(item.date).format('HH:mm, DD/MM')}
              rightSub={item.tableNumber}
              />
          </TouchableOpacity>
        )}
      />
    )
  }
  else{
    return(
      <View flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size="large"  color={Colors.primary}/>
      </View>
    )
  }
}

export const screenOptions = navData => {
    return {
        headerTitle: 'Orders',
        headerLeft: () => (
          <View flex={1} justifyContent="center" marginLeft={5} padding={5}>
            <Icon name="menu"
            size={30}
            color="white"
            marginRight={5}
            onPress={() => {
                navData.navigation.toggleDrawer()
            }}  />
          </View>
        )
    }
};

export default Orders;
