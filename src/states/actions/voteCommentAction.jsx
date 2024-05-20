import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
} from '../../utils/network-data';

const upVoteCommentActionCreator = (action) => {
  return {
    type: 'UP_VOTE_COMMENT',
    payload: action,
  };
};

const downVoteCommentActionCreator = (action) => {
  return {
    type: 'DOWN_VOTE_COMMENT',
    payload: action,
  };
};

const neutralizeVoteCommentActionCreator = (action) => {
  return {
    type: 'NEURALIZE_VOTE_COMMENT',
    payload: action,
  };
};

const asyncUpVoteComment = (threadId, commentId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await upVoteComment(threadId, commentId);
      dispatch(upVoteCommentActionCreator(response));
    } catch (e) {
      dispatch(
          upVoteCommentActionCreator({
            data: {},
            status: 'fail',
            message: e.message,
          }),
      );
    }
    dispatch(hideLoading());
  };
};

const asyncDownVoteComment = (threadId, commentId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await downVoteComment(threadId, commentId);
      dispatch(downVoteCommentActionCreator(response));
    } catch (e) {
      dispatch(
          downVoteCommentActionCreator({
            data: {},
            status: 'fail',
            message: e.message,
          }),
      );
    }
    dispatch(hideLoading());
  };
};

const asyncNeutralizeVoteComment = (threadId, commentId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = neutralizeVoteComment(threadId, commentId);
      dispatch(neutralizeVoteCommentActionCreator(response));
    } catch (e) {
      dispatch(
          neutralizeVoteCommentActionCreator({
            data: {},
            status: 'fail',
            message: e.message,
          }),
      );
    }
    dispatch(hideLoading());
  };
};

export {
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
};
