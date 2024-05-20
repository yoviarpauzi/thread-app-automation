import {FaSearch} from 'react-icons/fa';
import PropTypes from 'prop-types';

const SearchBarLg = ({value, listener}) => {
  return (
    <div className="relative lg:block hidden mx-auto w-2/4">
      <input
        type="text"
        className="w-full bg-tertiary border border-gray-700 rounded-md ps-2 pe-10 py-1 outline-orange-500"
        onChange={listener}
        value={value}
        placeholder="Search here..."
      />
      <FaSearch className="text-md text-orange-500 absolute top-1/2 transform -translate-y-1/2 right-3" />
    </div>
  );
};

SearchBarLg.propTypes = {
  value: PropTypes.string.isRequired,
  listener: PropTypes.func.isRequired,
};

export default SearchBarLg;
