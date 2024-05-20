import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {asyncGetThread} from '../../states/actions/getThreadAction';
import {asyncGetAllUser} from '../../states/actions/getAllUserAction';
import {BiSolidDislike, BiSolidLike} from 'react-icons/bi';
import {getAccessToken} from '../../utils/network-data';
import {asyncProfile} from '../../states/actions/profileAction';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../../states/actions/voteThreadAction';
import {Link} from 'react-router-dom';
import CreateComment from '../organisms/CreateComment';
import Comment from '../organisms/Comment';

const DetailThread = () => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const {threadId} = useParams();
  const fetchUser = useSelector((state) => state.getAllUser);
  const {data} = useSelector((state) => state.getThread);
  const fetchProfile = useSelector((state) => state.profile);
  const [upVotesBy, setUpVotesBy] = useState('');
  const [downVotesBy, setDownVotesBy] = useState('');
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [numOfLike, setNumOfLike] = useState([]);
  const [numOfDislike, setNumOfDislike] = useState([]);

  useEffect(() => {
    dispatch(asyncGetThread(threadId));
    dispatch(asyncGetAllUser());
  }, [dispatch, threadId]);

  useEffect(() => {
    if (accessToken) {
      dispatch(asyncProfile());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (!data?.upVotesBy || !fetchUser.data) return;

    const userUpVotes = data.upVotesBy.map((userId) => {
      const user = fetchUser.data.find((user) => user.id == userId);
      return user.name;
    });

    setNumOfLike(userUpVotes.length);
    setUpVotesBy(userUpVotes);
  }, [data, fetchUser]);

  useEffect(() => {
    if (!data?.downVotesBy || !fetchUser.data) return;

    const userDownVotes = data.downVotesBy.map((userId) => {
      const user = fetchUser.data.find((user) => user.id == userId);
      return user.name;
    });

    setNumOfDislike(userDownVotes.length);
    setDownVotesBy(userDownVotes);
  }, [data, fetchUser]);

  useEffect(() => {
    if (!fetchProfile.data?.name) return;

    const isFind = upVotesBy.includes(fetchProfile.data.name);
    setIsLike(isFind);
  }, [fetchProfile, upVotesBy]);

  useEffect(() => {
    if (!fetchProfile.data?.name) return;

    const isFind = downVotesBy.includes(fetchProfile.data.name);
    setIsDislike(isFind);
  }, [downVotesBy, fetchProfile]);

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
    dispatch(voteAction(threadId));
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
    dispatch(voteAction(threadId));
  };

  return (
    <>
      <div className="w-full lg:w-2/4">
        <div className="flex flex-col gap-y-5 p-4 bg-secondary rounded-md">
          <div className="flex items-center gap-x-2">
            <img
              src={data?.owner?.avatar}
              className="rounded-full w-10"
              alt="profile"
            />
            <div>
              <p className="text-base font-bold">{data?.owner?.name}</p>
              <p className="text-sm text-slate-500">
                {new Date(data?.createdAt).toLocaleString('en-US', {
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
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold text-pretty">{data?.title}</h1>
            <div>
              <Link to={`/?tag=${data?.category}`}>
                <button className="px-3 py-1 bg-tertiary rounded-md text-orange-500 border border-orange-500 text-xs">
                  #{data?.category}
                </button>
              </Link>
            </div>
            <p
              className="text-wrap break-words text-base"
              dangerouslySetInnerHTML={{__html: data?.body}}
            ></p>
          </div>
          <div className="flex gap-x-7">
            <div
              className="flex items-center gap-x-2"
              title={`Liked by ${upVotesBy}`}
            >
              <button
                className={`text-xl ${
                  isLike ? 'text-orange-500' : 'text-slate-500'
                }`}
                onClick={handleUpVote}
              >
                <BiSolidLike />
              </button>
              <p className="text-xs">{numOfLike}</p>
            </div>
            <div
              className="flex items-center gap-x-2"
              title={`Liked by ${downVotesBy}`}
            >
              <button
                className={`text-xl ${
                  isDislike ? 'text-orange-500' : 'text-slate-500'
                }`}
              >
                <BiSolidDislike onClick={handleDownVote} />
              </button>
              <p className="text-xs">{numOfDislike}</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-lg font-bold">{`${data?.comments.length} Comments`}</p>
        </div>
        <CreateComment profile={fetchProfile.data} threadId={threadId} />

        <div className="bg-secondary p-4 gap-y-5 flex flex-col">
          {data?.comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                comment={comment}
                users={fetchUser.data}
                profile={fetchProfile.data}
                threadId={threadId}
              />
            );
          })}
        </div>
      </div>
      <div className="lg:w-1/5"></div>
    </>
  );
};

export default DetailThread;
