import * as types from './actionTypes';
import loginApi from '../api/loginApi';
import * as session from './sessionActions';
import * as userAction from './userActions';

export const loginUser = (response) => {
  return {
      type: types.LOGIN_USER_SUCCESS,
      response
  };
};

export const loginError = (response) => {
  return {
    type: types.LOGIN_USER_ERROR,
    response
  };
};

export const login = (user, history) => {
  return (dispatch) => {
    return loginApi.postLogin(user).then(response => {
      session.saveSession(response);
      history.push(`/`);
      dispatch(loginUser(response));
      userAction.showLoginUser()(dispatch);
    },
      error => {
        dispatch(loginError(error));
      }
    ).catch(err => {
      throw (err);
    });
  };
};
