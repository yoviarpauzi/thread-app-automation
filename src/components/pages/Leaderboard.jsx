import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {asyncLeaderboard} from '../../states/actions/leaderboardAction';
import {useNavigate} from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(asyncLeaderboard());
  }, [dispatch]);

  const handleRefresh = () => {
    navigate(0);
  };

  return (
    <>
      <div className="w-full lg:w-2/4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">LeaderBoard</h1>
          <button
            className="px-3 py-1 bg-secondary text-orange-500 border border-orange-500 text-xs rounded-md"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
        <div>
          {data && (
            <ul className="flex flex-col gap-y-4 mt-4">
              {data.map((userLeaderboard, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-secondary px-3 py-2 rounded-md"
                >
                  <div className="flex items-center gap-x-5">
                    <img
                      src={userLeaderboard.user.avatar}
                      className="rounded-full w-12"
                      alt="profile"
                    />
                    <p>{userLeaderboard.user.name}</p>
                  </div>
                  <p>{userLeaderboard.score}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="lg:w-1/5"></div>
    </>
  );
};

export default Leaderboard;
