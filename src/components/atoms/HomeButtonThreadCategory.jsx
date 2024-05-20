import PropTypes from 'prop-types';
import {useSearchParams} from 'react-router-dom';

const HomeButtonThreadCategory = ({thread}) => {
  const [, setSearchParams] = useSearchParams();

  const handleButtonTag = () => {
    setSearchParams({tag: thread.category});
  };

  return (
    <button
      className="text-xs bg-tertiary border border-orange-500 text-orange-500 px-3 py-1 rounded-md"
      onClick={handleButtonTag}
    >
      # {thread.category}
    </button>
  );
};

HomeButtonThreadCategory.propTypes = {
  thread: PropTypes.object,
};

export default HomeButtonThreadCategory;
