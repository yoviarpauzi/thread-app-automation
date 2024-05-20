const registerReducer = (state = {}, action = {}) => {
  if (action.type == 'REGISTER') {
    return {
      data: action.payload.data,
      status: action.payload.status,
      message: action.payload.message,
    };
  }

  if (action.type == 'RESET_REGISTER') {
    return {
      data: {},
      status: '',
      message: '',
    };
  }
  return state;
};

export default registerReducer;
