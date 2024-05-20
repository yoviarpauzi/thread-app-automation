import {configureStore} from '@reduxjs/toolkit';
import registerReducer from './states/reducers/registerReducer';
import loginReducer from './states/reducers/loginReducer';
import getAllThreadReducer from './states/reducers/getAllThreadReducer';
import getAllUserReducer from './states/reducers/getAllUserReducer';
import profileReducer from './states/reducers/profileReducer';
import {loadingBarReducer} from 'react-redux-loading-bar';
import leaderboardReducer from './states/reducers/leaderboardReducer';
import voteThreadReducer from './states/reducers/voteThreadReducer';
import getThreadReducer from './states/reducers/getThreadReducer';
import createCommentReducer from './states/reducers/createCommentReducer';
import voteCommentReducer from './states/reducers/voteCommentReducer';
import createThreadReducer from './states/reducers/createThreadReducer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    loadingBar: loadingBarReducer,
    getAllThread: getAllThreadReducer,
    getAllUser: getAllUserReducer,
    profile: profileReducer,
    leaderboard: leaderboardReducer,
    voteThread: voteThreadReducer,
    getThread: getThreadReducer,
    createComent: createCommentReducer,
    voteComeent: voteCommentReducer,
    createThread: createThreadReducer,
  },
});

export default store;
