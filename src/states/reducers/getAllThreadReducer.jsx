const getAllThreadReducer = (state = {}, action = {}) => {
  if (action.type == 'GET_ALL_THREAD') {
    return {
      data: action.payload.data.threads,
      status: action.payload.status,
      message: action.payload.message,
    };
  }

  if (action.type == 'RESET_GET_ALL_THREAD') {
    return {
      data: [],
      status: '',
      message: '',
    };
  }
  return state;
};

export default getAllThreadReducer;
