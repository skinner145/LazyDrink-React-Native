import {GET_DRINKS} from '../actions/products';


const initialState = {
    availableDrinks: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_DRINKS:


            return {
                availableDrinks: action.drinks,

            }
    }
    return state;
}
