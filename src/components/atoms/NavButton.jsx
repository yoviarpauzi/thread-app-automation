import PropTypes from 'prop-types';

const NavButton = ({title, listener, children}) => {
  return (
    <button
      type="button"
      className="p-2 bg-tertiary rounded-full"
      title={title}
      onClick={listener}
    >
      {children}
    </button>
  );
};

NavButton.propTypes = {
  title: PropTypes.string.isRequired,
  listener: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavButton;
