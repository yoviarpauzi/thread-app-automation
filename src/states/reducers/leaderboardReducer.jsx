const leaderboardReducer = (state = {}, action = {}) => {
  if (action.type == 'LEADERBOARD') {
    return {
      data: action.payload.data?.leaderboards,
      message: action.payload.message,
      status: action.payload.status,
    };
  }

  return state;
};

export default leaderboardReducer;
