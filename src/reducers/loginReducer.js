import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.login, action) {

  switch (action.type) {
      case types.LOGIN_USER_SUCCES:{
        return Object.assign({},state,{token : action.request['user-token']});
      }
      case types.LOGIN_USER_ERROR:{
        return Object.assign({},state,{errorLogin: action.request.error});
      }
      default: {
        return state;
      }
    }
}
