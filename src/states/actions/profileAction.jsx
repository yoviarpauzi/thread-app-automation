import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {getProfile} from '../../utils/network-data';

const profileActionCreator = (action) => {
  return {
    type: 'PROFILE',
    payload: action,
  };
};

const profileReset = (action) => {
  return {
    type: 'RESET_PROFILE',
    payload: action,
  };
};

const asyncProfile = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await getProfile();
      dispatch(profileActionCreator(response));
    } catch (e) {
      dispatch(
          profileActionCreator({
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

export {profileActionCreator, profileReset, asyncProfile};
