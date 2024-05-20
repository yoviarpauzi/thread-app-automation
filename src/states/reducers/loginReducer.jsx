const loginReducer = (state = {}, action = {}) => {
  if (action.type == 'LOGIN') {
    return {
      data: action.payload.data.token,
      status: action.payload.status,
      message: action.payload.message,
    };
  }

  if (action.type == 'RESET_LOGIN') {
    return {
      data: {},
      status: '',
      message: '',
    };
  }
  return state;
};

export default loginReducer;
