import PropTypes from 'prop-types';
import {IoMdLogOut} from 'react-icons/io';

const ButtonLogout = ({listener}) => {
  return (
    <button
      className="absolute px-9 py-2 bg-tertiary text-orange-500 top-16 right-4 rounded-md sm:right-8 lg:right-16 xl:right-20 2xl:right-24 -z-0"
      onClick={listener}
    >
      <div className="flex items-center gap-x-1">
        <IoMdLogOut data-testid="logout-icon" />
        <p>Logout</p>
      </div>
    </button>
  );
};

ButtonLogout.propTypes = {
  listener: PropTypes.func.isRequired,
};

export default ButtonLogout;
