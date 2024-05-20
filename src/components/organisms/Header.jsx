import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import HeaderLogo from '../atoms/HeaderLogo';
import NavList from '../atoms/NavList';
import {IoMdLogIn} from 'react-icons/io';
import {FaLongArrowAltRight, FaSearch, FaTags} from 'react-icons/fa';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import ButtonLogout from '../atoms/ButtonLogout';
import Profile from '../atoms/Profile';
import SearchBarLg from '../molecules/SearchBarLg';
import NavButton from '../atoms/NavButton';
import SearchBar from '../molecules/SearchBar';
import {asyncGetAllThread} from '../../states/actions/getAllThreadAction';
import {asyncProfile} from '../../states/actions/profileAction';
import {getAccessToken, removeAccessToken} from '../../utils/network-data';
import LoadingBar from 'react-redux-loading-bar';

const Header = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const fetchThread = useSelector((state) => state.getAllThread);
  const fetchProfile = useSelector((state) => state.profile);
  const [isClickProfile, setIsClickProfile] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeTag, setActiveTag] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(asyncGetAllThread());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(asyncProfile());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (fetchThread.data) {
      const uniqueCategory = new Set();
      fetchThread.data.map((thread) => {
        uniqueCategory.add(thread.category);
      });
      setTags(Array.from(uniqueCategory));
    }
  }, [fetchThread]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    searchParams.delete('tag');
    if (value.trim() === '') {
      setSearchParams('');
    } else {
      setSearchParams({...Object.fromEntries(searchParams), search: value});
    }
  };

  const handleCloseSearch = () => {
    setSearchParams('');
    setActiveSearch(!activeSearch);
  };
  const handleLogout = () => {
    removeAccessToken();
    window.location.reload();
  };

  const handleClickTag = (tag) => {
    navigate(`/?tag=${tag}`);
    setActiveTag(false);
  };

  return (
    <header className="fixed w-screen bg-secondary shadow-sm z-10">
      <div className="container flex justify-between items-center py-3">
        <div className="flex items-center gap-x-8">
          <HeaderLogo />
        </div>
        <SearchBarLg
          value={searchParams.get('search') || ''}
          listener={handleSearchChange}
        />
        <nav>
          <NavList>
            {/* Search button */}
            <li className="lg:hidden">
              <NavButton
                listener={() => setActiveSearch(!activeSearch)}
                title="Search"
              >
                <FaSearch className="text-lg text-orange-500" />
              </NavButton>
            </li>
            {/* Tags */}
            <li className="lg:hidden">
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
      </div>
      {/* Search bar */}
      {activeSearch && (
        <SearchBar
          value={searchParams.get('search') || ''}
          listener={handleSearchChange}
          buttonListener={handleCloseSearch}
        />
      )}
      <LoadingBar showFastActions />
    </header>
  );
};

export default Header;
