import axios from 'axios'
import Drink from '../../models/drinks';

export const GET_DRINKS = 'GET_DRINKS';

export const getDrinks = (drinkId) => {
    return async dispatch => {
        const response = await fetch(
            'http://192.168.1.14:4000/drinks'
        )
        const resData = await response.json();
        const loadedDrinks = [];
        for (const key in resData){
            if(resData[key].type._id === drinkId.drinkType){
                loadedDrinks.push(
                    new Drink(
                        resData[key]._id,
                        resData[key].name,
                        resData[key].price,
                        resData[key].type)
                        )
            }
        }


        //console.log(loadedDrinks);





        dispatch({ type: GET_DRINKS, drinks: loadedDrinks})
    }
}
