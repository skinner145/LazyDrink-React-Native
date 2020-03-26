import axios from 'axios';
import Order from '../../models/order';
import { useSelector } from 'react-redux';

export const ADD_ORDER = 'ADD_ORDER';
export const GET_ORDER = 'GET_ORDER';
export const STORE_ORDER = 'STORE_ORDER';

// export const addOrder = (cartItems, totalPrice) => {
//     return {
//         type: ADD_ORDER,
//         orderData: {items: cartItems, price: totalPrice}
//     }
// }


export const storeOrder = (cartItems, tableNumber, totalPrice) => {
  return dispatch => {
    let order = {
      items: cartItems,
      tableNumber: tableNumber,
      totalPrice: totalPrice
    }
    dispatch( { type: STORE_ORDER, order: order})
  }
}

export const addOrder = (order, userId) => {
  return dispatch => {

    let newOrder = {
      drinks: [],
      tableNumber: order.tableNumber,
      totalPrice: order.totalPrice,
      user: userId
    }
    for(const key in order.drinks){
      newOrder.drinks.push({
        drink: order.drinks[key].productId,
        price: order.drinks[key].price,
        quantity: order.drinks[key].quantity,
        sum: order.drinks[key].sum
      })
    }
      axios.post('http://192.168.1.14:4000/orders', newOrder)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))
      dispatch({ type: ADD_ORDER})
  }
}

export const getOrder = (userId) => {
    let orders = []
    let loadedOrders = []
    return async dispatch => {
        const response = await fetch('http://192.168.1.14:4000/orders')
        const resData = await response.json();

        for(const key in resData){
          let orderNum = '000' + (key + 1);
          console.log(orderNum);
          if(resData[key].user === userId){
            loadedOrders.push(
              new Order(
                resData[key].drinks,
                resData[key].tableNumber,
                resData[key].totalPrice,
                resData[key].time,
                resData[key]._id,
                orderNum
              )
            )
          }
        }
        console.log(loadedOrders);
        const sortedOrders = loadedOrders.sort((a, b) => a.date - b.date);
          dispatch( { type: GET_ORDER, order: sortedOrders})
        }
      }

        // })
        // .catch(err => console.log(err))
        // console.log(loadedOrders);
        //
        // // console.log(loadedOrders);
        //
        //
        // dispatch({
        //     type: GET_ORDER,
        //     orderData: orders
        // })
