import PropTypes from 'prop-types';
import HomeThreadAvatar from '../atoms/HomeThreadAvatar';
import HomeThreadName from '../atoms/HomeThreadName';
import HomeThreadDate from '../atoms/HomeThreadDate';
import HomeThreadTitle from '../atoms/HomeThreadTitle';
import HomeButtonThreadCategory from '../atoms/HomeButtonThreadCategory';
import {BiSolidLike, BiSolidDislike} from 'react-icons/bi';
import {FaComment} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../../states/actions/voteThreadAction';
import {getAccessToken} from '../../utils/network-data';
import {Link} from 'react-router-dom';

const Thread = ({users, thread, index, fetchUsers, profile}) => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const [upVotesBy, setUpVotesBy] = useState([]);
  const [downVotesBy, setDownVotesBy] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [numOfLike, setNumOfLike] = useState([]);
  const [numOfDislike, setNumOfDislike] = useState([]);

  useEffect(() => {
    if (!thread.upVotesBy) return;

    const userUpVotes = thread.upVotesBy.map((userId) => {
      const user = fetchUsers.find((user) => user.id == userId);
      return user.name;
    });

    setNumOfLike(userUpVotes.length);
    setUpVotesBy(userUpVotes);
  }, [thread.upVotesBy, fetchUsers]);

  useEffect(() => {
    if (!thread.downVotesBy) return;

    const userDownVotes = thread.downVotesBy.map((userId) => {
      const user = fetchUsers.find((user) => user.id == userId);
      return user.name;
    });

    setNumOfDislike(userDownVotes.length);
    setDownVotesBy(userDownVotes);
  }, [thread.downVotesBy, fetchUsers]);

  useEffect(() => {
    if (!profile?.name) return;

    const isFind = upVotesBy.includes(profile.name);
    setIsLike(isFind);
  }, [profile, upVotesBy]);

  useEffect(() => {
    if (!profile?.name || !downVotesBy) return;

    const isFind = downVotesBy.includes(profile.name);
    setIsDislike(isFind);
  }, [profile, downVotesBy]);

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

    const voteAction = !isLike ? asyncUpVoteThread : asyncNeutralizeVoteThread;
    dispatch(voteAction(thread.id));
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
      asyncDownVoteThread :
      asyncNeutralizeVoteThread;
    dispatch(voteAction(thread.id));
  };

  return (
    <div className="flex bg-secondary rounded-lg flex-col px-3 py-4 gap-y-4">
      <div className="flex gap-x-3 items-center">
        <HomeThreadAvatar users={users} index={index} />
        <div>
          <HomeThreadName users={users} index={index} />
          <HomeThreadDate thread={thread} />
        </div>
      </div>
      <div>
        <Link to={`/thread/${thread.id}`}>
          <HomeThreadTitle thread={thread} />
        </Link>
        <HomeButtonThreadCategory thread={thread} />
      </div>
      <div className="flex gap-x-5">
        <div className="flex items-center gap-x-1 relative">
          <button
            onClick={handleUpVote}
            title={`Liked by ${upVotesBy.map((name) => name)}`}
          >
            <BiSolidLike
              className={`text-xl ${
                isLike ? 'text-orange-500' : 'text-slate-500'
              }`}
            />
          </button>
          <p className="text-slate-500 text-xs">{numOfLike}</p>
        </div>
        <div className="flex items-center gap-x-1">
          <button onClick={handleDownVote}>
            <BiSolidDislike
              className={`text-xl ${
                isDislike ? 'text-orange-500' : 'text-slate-500'
              }`}
              title={`Disliked by ${downVotesBy.map((name) => name)}`}
            />
          </button>
          <p className="text-slate-500 text-xs">{numOfDislike}</p>
        </div>
        <div className="flex items-center gap-x-1">
          <button>
            <FaComment className="text-slate-500 text-xl" />
          </button>
          <p className="text-slate-500 text-xs">{thread.totalComments}</p>
        </div>
      </div>
    </div>
  );
};

Thread.propTypes = {
  profile: PropTypes.object,
  fetchUsers: PropTypes.array,
  users: PropTypes.array,
  thread: PropTypes.object,
  index: PropTypes.number,
};

export default Thread;
