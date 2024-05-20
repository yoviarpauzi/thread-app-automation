import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {getLeaderboard} from '../../utils/network-data';

const leaderboardActionCreator = (action) => {
  return {
    type: 'LEADERBOARD',
    payload: action,
  };
};

const asyncLeaderboard = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await getLeaderboard();
      dispatch(leaderboardActionCreator(response));
    } catch (e) {
      dispatch(
          leaderboardActionCreator({
            data: [],
            status: 'fail',
            message: e.message,
          }),
      );
    }
    dispatch(hideLoading());
  };
};

export {leaderboardActionCreator, asyncLeaderboard};
