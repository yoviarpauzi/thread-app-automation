import PropTypes from 'prop-types';

const ButtonClearFilter = ({listener}) => {
  return (
    <button
      className="text-xs px-3 py-2 bg-tertiary border border-orange-500 text-nowrap rounded-lg"
      onClick={listener}
    >
      Clear filter
    </button>
  );
};

ButtonClearFilter.propTypes = {
  listener: PropTypes.func.isRequired,
};

export default ButtonClearFilter;
