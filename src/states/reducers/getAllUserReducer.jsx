const getAllUserReducer = (state = {}, action = {}) => {
  if (action.type == 'GET_ALL_USER') {
    return {
      data: action.payload.data?.users,
      status: action.payload.status,
      message: action.payload.message,
    };
  }

  if (action.type == 'RESET_GET_ALL_USER') {
    return {
      data: [],
      status: '',
      message: '',
    };
  }
  return state;
};

export default getAllUserReducer;
