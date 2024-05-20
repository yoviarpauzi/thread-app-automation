const createCommentReducer = (state = {}, action = {}) => {
  if (action.type == 'CREATE_COMMENT') {
    return {
      data: action.payload.data,
      message: action.payload.message,
      status: action.payload.status,
    };
  }

  if (action.type == 'RESET_COMMENT') {
    return {
      data: {},
      status: '',
      message: '',
    };
  }

  return state;
};

export default createCommentReducer;
