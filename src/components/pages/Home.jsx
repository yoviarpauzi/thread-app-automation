import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Thread from '../organisms/Thread';
import {asyncGetAllThread} from '../../states/actions/getAllThreadAction';
import {asyncGetAllUser} from '../../states/actions/getAllUserAction';
import {asyncProfile} from '../../states/actions/profileAction';
import ButtonClearFilter from '../atoms/ButtonClearFilter';
import TagHome from '../molecules/TagHome';

const Home = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const fetchProfile = useSelector((state) => state.profile);
  const fetchThread = useSelector((state) => state.getAllThread);
  const fetchUser = useSelector((state) => state.getAllUser);
  const [tags, setTags] = useState([]);
  const [threads, setThreads] = useState([]);
  const [users, setUsers] = useState([]);
  const searchQuery = searchParams.get('search');
  const tagQuery = searchParams.get('tag');

  useEffect(() => {
    dispatch(asyncProfile());
    dispatch(asyncGetAllThread());
    dispatch(asyncGetAllUser());
  }, [dispatch]);

  useEffect(() => {
    if (fetchThread.data) {
      const uniqueCategories = new Set(
          fetchThread.data.map((thread) => thread.category),
      );
      setTags(Array.from(uniqueCategories));
    }
  }, [fetchThread]);

  useEffect(() => {
    if (!fetchThread.data || !Array.isArray(fetchUser.data)) return;

    let tempThread = [...fetchThread.data];

    if (searchQuery || tagQuery) {
      tempThread = tempThread.filter((thread) => {
        const searchLower = searchQuery?.toLowerCase();
        const tagLower = tagQuery?.toLowerCase();

        const matchesSearch =
          searchLower &&
          (thread.title.toLowerCase().includes(searchLower) ||
            thread.category.toLowerCase().includes(searchLower));
        const matchesTag =
          tagLower && thread.category.toLowerCase().includes(tagLower);

        return matchesSearch || matchesTag;
      });
    }
    setThreads(tempThread);

    const mappedUsers = tempThread.map((thread) => {
      const owner = fetchUser.data.find((user) => user.id === thread.ownerId);
      return {
        name: owner.name,
        avatar: owner.avatar,
      };
    });
    setUsers(mappedUsers);
  }, [fetchUser, fetchThread.data, searchQuery, tagQuery]);

  const handleClearFilter = () => {
    setSearchParams('');
  };

  const handleClickTag = (tag) => {
    setSearchParams({tag: tag});
  };

  return (
    <>
      <div className="w-full lg:w-2/4">
        {threads.length === 0 ? (
          <div className="w-full h-96 flex justify-center items-center">
            <p className="text-slate-400 italic">Thread not found</p>
          </div>
        ) : (
          <div>
            {tagQuery && (
              <div className="flex justify-between items-center my-3">
                <p>Show result for category &quot;{tagQuery}&quot;</p>
                <ButtonClearFilter listener={handleClearFilter} />
              </div>
            )}
            <div className="flex flex-col gap-y-4">
              {threads.map((thread, index) => {
                return (
                  <Thread
                    key={index}
                    thread={thread}
                    users={users}
                    index={index}
                    fetchUsers={fetchUser.data}
                    profile={fetchProfile.data}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:block w-1/5">
        <TagHome tags={tags} listener={handleClickTag} />
      </div>
    </>
  );
};

export default Home;
