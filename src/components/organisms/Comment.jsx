import {BiSolidLike, BiSolidDislike} from 'react-icons/bi';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {getAccessToken} from '../../utils/network-data';
import {
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../../states/actions/voteCommentAction';
import {useDispatch} from 'react-redux';

const Comment = ({comment, users, profile, threadId}) => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const [upVotesBy, setUpVotesBy] = useState([]);
  const [downVotesBy, setDownVotesBy] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [numOfLike, setNumOfLike] = useState(0);
  const [numOfDislike, setNumOfDislike] = useState(0);

  useEffect(() => {
    if (!users || !comment) return;

    const userVotes = comment.upVotesBy.map((userId) => {
      const user = users.find((user) => userId == user.id);
      return user.name;
    });

    setNumOfLike(userVotes.length);
    setUpVotesBy(userVotes);
  }, [comment, users]);

  useEffect(() => {
    if (!users || !comment) return;

    const userVotes = comment.downVotesBy.map((userId) => {
      const user = users.find((user) => userId == user.id);
      return user.name;
    });
    setNumOfDislike(userVotes.length);
    setDownVotesBy(userVotes);
  }, [comment, users]);

  useEffect(() => {
    if (!profile) return;

    const isFind = upVotesBy.includes(profile.name);
    setIsLike(isFind);
  }, [profile, upVotesBy]);

  useEffect(() => {
    if (!profile) return;

    const isFind = downVotesBy.includes(profile.name);
    setIsDislike(isFind);
  }, [downVotesBy, profile]);

  const handleUpVote = () => {
    if (!accessToken) {
      window.alert('You must login first!');
      return;
    }

    setIsLike(!isLike);
    setNumOfLike((prev) => (!isLike ? prev + 1 : prev - 1));

    if (!isLike && isDislike) {
      setIsDislike(false);
      setNumOfDislike((prev) => prev - 1);
    }

    const voteAction = !isLike ?
      asyncUpVoteComment :
      asyncNeutralizeVoteComment;
    dispatch(voteAction(threadId, comment.id));
  };

  const handleDownVote = () => {
    if (!accessToken) {
      window.alert('You must login first!');
      return;
    }

    setIsDislike(!isDislike);
    setNumOfDislike((prev) => (!isDislike ? prev + 1 : prev - 1));

    if (!isDislike && isLike) {
      setIsLike(false);
      setNumOfLike((prev) => prev - 1);
    }

    const voteAction = !isDislike ?
      asyncDownVoteComment :
      asyncNeutralizeVoteComment;
    dispatch(voteAction(threadId, comment.id));
  };

  return (
    <div className="border border-slate-500 p-4 flex flex-col gap-y-3">
      <div className="flex gap-x-2 items-center">
        <img
          src={comment.owner.avatar}
          alt="profile"
          className="w-8 rounded-full"
        />
        <div>
          <p>{comment.owner.name}</p>
          <p className="text-sm text-slate-500">
            {new Date(comment.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </p>
        </div>
      </div>
      <p dangerouslySetInnerHTML={{__html: comment.content}}></p>
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-1">
          <button onClick={handleUpVote}>
            <BiSolidLike
              className={`text-base ${
                isLike ? 'text-orange-500' : 'text-slate-500'
              }`}
            />
          </button>
          <p className="text-xs" title={`Liked by ${upVotesBy}`}>
            {numOfLike}
          </p>
        </div>
        <div className="flex items-center gap-x-1">
          <button className="flex items-center" onClick={handleDownVote}>
            <BiSolidDislike
              className={`text-base ${
                isDislike ? 'text-orange-500' : 'text-slate-500'
              }`}
            />
          </button>
          <p className="text-xs" title={`Liked by ${downVotesBy}`}>
            {numOfDislike}
          </p>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  users: PropTypes.array,
  profile: PropTypes.object,
  threadId: PropTypes.string,
};

export default Comment;
