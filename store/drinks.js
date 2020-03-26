// import thunkMiddleware from 'redux-thunk';
// import { createStore, applyMiddleware } from 'redux';
// import axios from 'axios';

// const defaultState = {
//     drinks: {},
//     isDataInitialized: false
// };

// function rootReducer(state = defaultState, action){
//     switch(action.type){
//         case 'DATA_INITIALIZED':
//         return{
//             ...state,
//             drinks: action.drinks,
//             isDataInitialized: true
//         };
//         default: 
//         return state;
//     }
// }

// export const getDrinks =() => async dispatch => {
//     try{
//         let drinks = await axios.get('http://loclahost:4000/drinks');
//         dispatch({type: 'DATA_INITIALIZED', drinks, isDataInitialized: true});
//     }
//     catch(error){
//         console.log(error);   
// }
// }

// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// export default store;