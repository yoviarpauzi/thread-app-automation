import NavList from '../atoms/NavList';
import NavButton from '../atoms/NavButton';
import {FaSearch, FaTags, FaLongArrowAltRight} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {IoMdLogIn} from 'react-icons/io';
import Profile from '../atoms/Profile';
import ButtonLogout from '../atoms/ButtonLogout';
import PropTypes from 'prop-types';

const Nav = ({
  setActiveSearch,
  activeSearch,
  setActiveTag,
  activeTag,
  tags,
  accessToken,
  fetchProfile,
  setIsClickProfile,
  isClickProfile,
  handleLogout,
  handleClickTag,
}) => {
  return (
    <nav>
      <NavList>
        {/* Search button */}
        <li className="md:hidden">
          <NavButton
            listener={() => setActiveSearch(!activeSearch)}
            title="Search"
          >
            <FaSearch className="text-lg text-orange-500" />
          </NavButton>
        </li>
        {/* Tags */}
        <li className="md:hidden">
          <NavButton listener={() => setActiveTag(true)} title="Tag">
            <FaTags className="text-lg text-orange-500" />
          </NavButton>
          {activeTag && (
            <div className="absolute h-screen w-4/5 bg-secondary right-0 top-0 px-4 py-5 z-10">
              <button className="mb-4" onClick={() => setActiveTag(false)}>
                <FaLongArrowAltRight className="text-orange-500 text-2xl" />
              </button>
              <h1 className="text-xl text-orange-500 mb-4">Tags</h1>
              <div className="grid grid-cols-2 auto-rows-auto gap-x-3 gap-y-5">
                {tags &&
                  tags.map((tag, index) => (
                    <button
                      key={index}
                      className="p-1 rounded-xl border border-orange-500"
                      onClick={() => {
                        handleClickTag(tag);
                      }}
                    >
                      #{tag}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </li>
        {/* Profile */}
        <li>
          {accessToken ? (
            <>
              {fetchProfile.data && (
                <Profile
                  avatar={fetchProfile.data.avatar}
                  listener={() => setIsClickProfile(!isClickProfile)}
                />
              )}
              {isClickProfile && <ButtonLogout listener={handleLogout} />}
            </>
          ) : (
            <Link to={`/login`}>
              <NavButton listener={() => {}} title="Login">
                <IoMdLogIn className="text-lg text-orange-500" />
              </NavButton>
            </Link>
          )}
        </li>
      </NavList>
    </nav>
  );
};

Nav.propTypes = {
  setActiveSearch: PropTypes.func.isRequired,
  activeSearch: PropTypes.bool.isRequired,
  setActiveTag: PropTypes.func.isRequired,
  activeTag: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired,
  accessToken: PropTypes.string,
  fetchProfile: PropTypes.object,
  setIsClickProfile: PropTypes.func.isRequired,
  isClickProfile: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleClickTag: PropTypes.func.isRequired,
};

export default Nav;
