import PropTypes from 'prop-types';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {asyncCreateComment} from '../../states/actions/createCommentAction';
import {getAccessToken} from '../../utils/network-data';
import {Link} from 'react-router-dom';
import {asyncGetThread} from '../../states/actions/getThreadAction';

const CreateComment = ({profile, threadId}) => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleInput = (e) => {
    setContent(e.target.innerText);
  };

  const handleSubmit = () => {
    dispatch(asyncCreateComment(threadId, content));
    dispatch(asyncGetThread(threadId));
    setContent('');
  };

  return accessToken ? (
    <div className="flex gap-x-3 items-start bg-secondary p-4">
      <img className="w-8 rounded-full" src={profile?.avatar} alt="profile" />
      <div className="flex flex-col w-full items-start gap-y-4">
        <div
          contentEditable="true"
          className="w-full border border-slate-500 h-20 focus:outline-orange-500 rounded-md px-2 py-1 overflow-auto cursor-text relative"
          data-placeholder="Enter comment here..."
          onInput={handleInput}
        ></div>
        <button
          className="px-5 py-1 bg-orange-500 text-sm rounded-md"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center bg-secondary p-4">
      <div className="border border-slate-500 w-full text-center py-4">
        <p>Login to send comment</p>
        <Link to={`/login`} className="underline">
          Login
        </Link>
      </div>
    </div>
  );
};

CreateComment.propTypes = {
  profile: PropTypes.object,
  threadId: PropTypes.string,
};

export default CreateComment;
