const createThreadReducer = (state = {}, action = {}) => {
  if (action.type == 'CREATE_THREAD') {
    return {
      data: action.payload.data,
      status: action.payload.status,
      message: action.payload.message,
    };
  }

  if (action.type == 'RESET_CREATE_THREAD') {
    return {
      data: {},
      status: '',
      message: '',
    };
  }

  return state;
};

export default createThreadReducer;
