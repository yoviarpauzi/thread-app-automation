import {
  upVoteThread,
  downVoteThread,
  neutralizeVoteThread,
} from '../../utils/network-data';

const upVoteThreadActionCreator = (action) => {
  return {
    type: 'UP_VOTE_THREAD',
    payload: action,
  };
};

const downVoteThreadActionCreator = (action) => {
  return {
    type: 'DOWN_VOTE_THREAD',
    payload: action,
  };
};

const neutralizeVoteThreadActionCretor = (action) => {
  return {
    type: 'NEUTRALIZE_VOTE_THREAD',
    payload: action,
  };
};

const asyncUpVoteThread = (threadId) => {
  return async (dispatch) => {
    try {
      const response = await upVoteThread(threadId);
      dispatch(upVoteThreadActionCreator(response));
    } catch (e) {
      dispatch(
          upVoteThreadActionCreator({
            data: {},
            message: e.message,
            status: 'fail',
          }),
      );
    }
  };
};

const asyncDownVoteThread = (threadId) => {
  return async (dispatch) => {
    try {
      const response = await downVoteThread(threadId);
      dispatch(downVoteThreadActionCreator(response));
    } catch (e) {
      dispatch(
          downVoteThreadActionCreator({
            data: {},
            message: e.message,
            status: 'fail',
          }),
      );
    }
  };
};

const asyncNeutralizeVoteThread = (threadId) => {
  return async (dispatch) => {
    try {
      const response = await neutralizeVoteThread(threadId);
      dispatch(neutralizeVoteThreadActionCretor(response));
    } catch (e) {
      dispatch(
          neutralizeVoteThreadActionCretor({
            data: {},
            message: e.message,
            status: 'fail',
          }),
      );
    }
  };
};

export {
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCretor,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
};
