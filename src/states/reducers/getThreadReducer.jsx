const getThreadReducer = (state = {}, action = {}) => {
  if (action.type == 'GET_THREAD') {
    return {
      data: action.payload.data?.detailThread,
      status: action.payload.status,
      message: action.payload.message,
    };
  }

  if (action.type == 'RESET_GET_THREAD') {
    return {
      data: {},
      status: '',
      message: '',
    };
  }
  return state;
};

export default getThreadReducer;
