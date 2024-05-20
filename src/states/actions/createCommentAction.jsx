import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {createComment} from '../../utils/network-data';

const createCommentActionCreator = (action) => {
  return {
    type: 'CREATE_COMMENT',
    payload: action,
  };
};

const resetComment = (action) => {
  return {
    type: 'RESET_CREATE_COMMENT',
    payload: action,
  };
};

const asyncCreateComment = (threadId, content) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await createComment(threadId, {content});
      console.log(response);
      dispatch(createCommentActionCreator(response));
    } catch (e) {
      dispatch(
          createCommentActionCreator({
            data: {},
            message: e.message,
            status: 'fail',
          }),
      );
    }
    dispatch(hideLoading());
  };
};

export {createCommentActionCreator, resetComment, asyncCreateComment};
