const voteThreadReducer = (state = {}, action = {}) => {
  if (action.type == 'UP_VOTE_THREAD') {
    return {
      data: action.payload.data,
      message: action.payload.message,
      status: action.payload.status,
    };
  }

  if (action.type == 'DOWN_VOTE_THREAD') {
    return {
      data: action.payload.data,
      message: action.payload.message,
      status: action.payload.status,
    };
  }

  if (action.type == 'NEUTRALIZE_VOTE_THREAD') {
    return {
      data: action.payload.data,
      message: action.payload.message,
      status: action.payload.status,
    };
  }

  return state;
};

export default voteThreadReducer;
