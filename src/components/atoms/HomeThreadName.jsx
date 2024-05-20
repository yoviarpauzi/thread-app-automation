import PropTypes, {object} from 'prop-types';

const HomeThreadName = ({users, index}) => {
  return <p className="text-base font-bold">{users[index].name}</p>;
};

HomeThreadName.propTypes = {
  users: PropTypes.arrayOf(object),
  index: PropTypes.number,
};

export default HomeThreadName;
