/**
 * @Author: Arthur Skinner
 * @Date:   2020-03-03T11:09:17+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-10T19:55:46+00:00
 */



import User from '../../models/user';

import { AUTHENTICATE, SIGNIN, SIGNUP, LOGOUT } from '../actions/auth';

const initialState = {
    token: null,
    userId: null
}

export default(state = initialState, action) => {
    switch(action.type){
        case SIGNIN:
            return{
              token: action.token,
              userId: action.userId
            }
        case SIGNUP:
            return{
              token: action.token,
              userId: action.userId
            }
          case LOGOUT:
            return{
              initialState
            }
        default:
          return state;
    }
}
