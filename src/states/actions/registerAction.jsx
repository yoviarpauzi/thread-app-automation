import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {register} from '../../utils/network-data';

const registerActionCreator = (action) => {
  return {
    type: 'REGISTER',
    payload: action,
  };
};

const registerReset = (action) => {
  return {
    type: 'RESET_REGISTER',
    payload: action,
  };
};

const asyncRegister = (userCredential) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await register(userCredential);
      dispatch(registerActionCreator(response));
    } catch (e) {
      dispatch(
          registerActionCreator({
            data: {
              user: {},
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

export {registerActionCreator, registerReset, asyncRegister};
