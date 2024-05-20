import {getAllUsers} from '../../utils/network-data';

const getAllUserActionCreator = (action) => {
  return {
    type: 'GET_ALL_USER',
    payload: action,
  };
};

const getAllUserReset = (action) => {
  return {
    type: 'RESET_GET_ALL_USER',
    payload: action,
  };
};

const asyncGetAllUser = () => {
  return async (dispatch) => {
    try {
      const response = await getAllUsers();
      dispatch(getAllUserActionCreator(response));
    } catch (e) {
      return {
        data: {},
        message: 'fail',
        status: e.message,
      };
    }
  };
};

export {getAllUserActionCreator, getAllUserReset, asyncGetAllUser};
