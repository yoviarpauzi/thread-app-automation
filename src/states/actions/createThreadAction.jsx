import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {createThread} from '../../utils/network-data';

const createThreadActionCreator = (action) => {
  return {
    type: 'CREATE_THREAD',
    payload: action,
  };
};

const createThreadReset = (action) => {
  return {
    type: 'RESET_CREATE_THREAD',
    payload: action,
  };
};

const asyncCreateThread = (thread) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await createThread(thread);
      console.log(response);
      dispatch(createThreadActionCreator(response));
    } catch (e) {
      dispatch(
          createThreadActionCreator({
            data: {},
            message: '',
            status: '',
          }),
      );
    }

    dispatch(hideLoading());
  };
};

export {createThreadActionCreator, createThreadReset, asyncCreateThread};
