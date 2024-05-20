import ButtonCloseSearchBar from '../atoms/ButtonCloseSearchBar';
import {FaSearch} from 'react-icons/fa';
import PropTypes from 'prop-types';

const SearchBar = ({value, listener, buttonListener}) => {
  return (
    <div className="absolute top-0 bottom-0 container flex items-center gap-x-2 bg-secondary">
      <div className="relative w-full">
        <input
          type="text"
          className="w-full bg-tertiary ps-2 pe-10 py-1 rounded-md border border-gray-700 outline-orange-500"
          onChange={listener}
          value={value}
          autoFocus
        />
        <FaSearch className="text-lg text-orange-500 absolute top-1/2 transform -translate-y-1/2 right-3" />
      </div>
      <ButtonCloseSearchBar listener={buttonListener} />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  listener: PropTypes.func.isRequired,
  buttonListener: PropTypes.func.isRequired,
};

export default SearchBar;
