import axios from 'axios'
import Type from '../../models/type';

export const GET_TYPES = 'GET_TYPES';

export const getTypes = () => {
    return async dispatch => {
        const response = await fetch(
            'http://192.168.1.3:4000/types'
        )
        const resData = await response.json();

        console.log(resData);
        const loadedTypes = [];
        for (const key in resData){

            loadedTypes.push(
                new Type(
                    resData[key]._id,
                    resData[key].name)
                    )
        }








        dispatch({ type: GET_TYPES, types: loadedTypes})
    }
}
