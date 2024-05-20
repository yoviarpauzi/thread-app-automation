import {MdAddBox} from 'react-icons/md';
import {FaHome} from 'react-icons/fa';
import {MdLeaderboard} from 'react-icons/md';
import {Link} from 'react-router-dom';

const NavHome = () => {
  return (
    <nav className="hidden lg:block w-1/5">
      <div className="flex flex-col gap-y-3">
        <Link to={`/create`}>
          <button className="flex items-center px-2 gap-x-1 text-orange-500 h-10 rounded-md hover:opacity-60">
            <MdAddBox className="text-xl" />
            <p className="text-sm">Create Thread</p>
          </button>
        </Link>
        <div className="flex flex-col gap-x-2">
          <Link to={`/`}>
            <button className="flex items-center w-full px-2 gap-x-1 hover:bg-tertiary text-orange-500 h-10 hover:rounded-md hover:opacity-60">
              <FaHome className="text-xl" />
              <p className="text-sm">Home</p>
            </button>
          </Link>
          <Link to={`/leaderboard`}>
            <button className="flex items-center w-full px-2 gap-x-1 hover:bg-tertiary text-orange-500 h-10 hover:rounded-md hover:opacity-60">
              <MdLeaderboard className="text-xl" />
              <p className="text-sm">Leaderboard</p>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavHome;
