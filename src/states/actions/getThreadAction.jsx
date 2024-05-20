import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {getThread} from '../../utils/network-data';

const getThreadActionCreator = (action) => {
  return {
    type: 'GET_THREAD',
    payload: action,
  };
};

const getThreadReset = (action) => {
  return {
    type: 'RESET_GET_THREAD',
    payload: action,
  };
};

const asyncGetThread = (threadId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await getThread(threadId);
      dispatch(getThreadActionCreator(response));
    } catch (e) {
      return {
        data: {},
        message: 'fail',
        status: e.message,
      };
    }
    dispatch(hideLoading());
  };
};

export {getThreadActionCreator, getThreadReset, asyncGetThread};
