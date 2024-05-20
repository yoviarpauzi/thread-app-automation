import {FaHome} from 'react-icons/fa';
import {MdAddBox, MdLeaderboard} from 'react-icons/md';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="fixed w-screen bottom-0 bg-secondary py-2 lg:hidden">
      <ul className="flex justify-evenly">
        <li>
          <Link to={`/create`}>
            <button title="Create Thread">
              <MdAddBox className="text-orange-500 text-xl hover:opacity-60" />
            </button>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <button title="Home">
              <FaHome className="text-orange-500 text-xl hover:opacity-60" />
            </button>
          </Link>
        </li>
        <li>
          <Link to={`/leaderboard`}>
            <button title="Leaderboard">
              <MdLeaderboard className="text-orange-500 text-xl hover:opacity-60" />
            </button>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
