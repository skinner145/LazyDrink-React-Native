import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../actions/orders';
import SyncStorage from 'sync-storage';
const initialState = {
    items: {},
    totalPrice: 0
};

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;


            const productTitle = addedProduct.name;
            const drinkPrice = addedProduct.price;
            //console.log(addedProduct.price);
            let updatedOrNewCartItem;

            if(state.items[addedProduct.id]){
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productTitle,
                    drinkPrice,
                    drinkPrice * (state.items[addedProduct.id].quantity + 1)
                );
                console.log(state.items);
                return{
                    ...state,
                    items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
                    totalPrice: state.totalPrice + drinkPrice
                }


            }else{
                updatedOrNewCartItem = new CartItem(
                    1,
                    productTitle,
                    drinkPrice,
                    drinkPrice
                );
                return{
                    ...state,
                    items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
                    totalPrice: state.totalPrice + drinkPrice
                }
            }




            case REMOVE_FROM_CART:
                const selectedCartItem = state.items[action.pid];


                const currentQty = selectedCartItem.quantity;
                let updatedCartItems;
                if (currentQty > 1){
                    const updatedCartItem = new CartItem(
                        selectedCartItem.quantity - 1,
                        selectedCartItem.drinkPrice,
                        selectedCartItem.productTitle,
                        selectedCartItem.sum - selectedCartItem.drinkPrice);
                        updatedCartItems = {...state.items, [action.pid]: updatedCartItem}
                }
                else{
                    updatedCartItems = {...state.items};
                    delete updatedCartItems[action.pid];
                }
                return{
                    ...state,
                    items: updatedCartItems,
                    totalPrice: state.totalPrice - selectedCartItem.productPrice
                }
            case ADD_ORDER:
                return initialState;
    }
    return state;
}
