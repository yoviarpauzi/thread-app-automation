import PropTypes from 'prop-types';

const ButtonSubmit = ({children}) => {
  return (
    <button
      type="submit"
      className="py-1 bg-orange-500 mt-4 rounded-md hover:bg-orange-700"
    >
      {children}
    </button>
  );
};

ButtonSubmit.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ButtonSubmit;
