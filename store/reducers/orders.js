import Order from "../../models/order";
import { ADD_ORDER, GET_ORDER, STORE_ORDER } from '../actions/orders';

const initialState = {
    storedOrder: [],
    orders: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case STORE_ORDER:
          const newOrder = new Order(
            action.order.items,
            action.order.tableNumber,
            action.order.totalPrice,
          )
          return{
            storedOrder: newOrder
          }
        // case ADD_ORDER:
        //     const newOrder = new Order(
        //         new Date().toString(),
        //         action.orderData.drinks,
        //         action.orderData.price,
        //         action.orderData.table,
        //         new Date()
        //         );
        //         return{
        //             ...state,
        //             orders: state.orders.concat(newOrder)
        //         }
        case GET_ORDER:
          return {
              orders: action.order
          }

    }

    return state;
}
