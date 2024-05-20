import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {login} from '../../utils/network-data';

const loginActionCreator = (action) => {
  return {
    type: 'LOGIN',
    payload: action,
  };
};

const loginReset = (action) => {
  return {
    type: 'RESET_LOGIN',
    payload: action,
  };
};

const asyncLogin = (userCredential) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await login(userCredential);
      dispatch(loginActionCreator(response));
    } catch (e) {
      dispatch(
          loginActionCreator({
            data: {
              token: '',
            },
            message: e.message,
            status: 'fail',
          }),
      );
    } finally {
      dispatch(hideLoading());
    }
  };
};

export {loginActionCreator, loginReset, asyncLogin};
