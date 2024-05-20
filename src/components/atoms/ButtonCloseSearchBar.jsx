import {IoMdClose} from 'react-icons/io';
import PropTypes from 'prop-types';

const ButtonCloseSearchBar = ({listener}) => {
  return (
    <button type="button" onClick={listener}>
      <IoMdClose className="text-orange-500 text-2xl font-bold" />
    </button>
  );
};

ButtonCloseSearchBar.propTypes = {
  listener: PropTypes.func.isRequired,
};

export default ButtonCloseSearchBar;
