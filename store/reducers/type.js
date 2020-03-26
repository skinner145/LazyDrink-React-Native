import {GET_TYPES } from '../actions/type';

const initialState = {
    availableTypes: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_TYPES:
            return {
                availableTypes: action.types,
            }
    }
    return state;
}
