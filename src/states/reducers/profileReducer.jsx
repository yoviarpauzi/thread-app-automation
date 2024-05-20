const profileReducer = (state = {}, action = {}) => {
  if (action.type == 'PROFILE') {
    return {
      data: action.payload.data.user,
      status: action.payload.status,
      message: action.payload.message,
    };
  }

  if (action.type == 'RESET_PROFILE') {
    return {
      data: {},
      status: '',
      message: '',
    };
  }
  return state;
};

export default profileReducer;
