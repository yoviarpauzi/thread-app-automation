import PropTypes from 'prop-types';

const NavList = ({children}) => {
  return <ul className="flex items-center gap-x-3">{children}</ul>;
};

NavList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavList;
