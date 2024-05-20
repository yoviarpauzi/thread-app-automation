import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {getAllThread} from '../../utils/network-data';

const getAllThreadActionCreator = (action) => {
  return {
    type: 'GET_ALL_THREAD',
    payload: action,
  };
};

const getAllThreadReset = (action) => {
  return {
    type: 'RESET_GET_ALL_THREAD',
    payload: action,
  };
};

const asyncGetAllThread = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await getAllThread();
      dispatch(getAllThreadActionCreator(response));
    } catch (e) {
      dispatch(
          getAllThreadActionCreator({
            data: {
              threads: [],
            },
            status: 'fail',
            message: 'failed retrieve data',
          }),
      );
    } finally {
      dispatch(hideLoading());
    }
  };
};

export {getAllThreadActionCreator, getAllThreadReset, asyncGetAllThread};
