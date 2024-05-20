import PropTypes, {object} from 'prop-types';

const HomeThreadAvatar = ({users, index}) => {
  return (
    <img src={users[index].avatar} alt="avatar" className="w-10 rounded-full" />
  );
};

HomeThreadAvatar.propTypes = {
  users: PropTypes.arrayOf(object),
  index: PropTypes.number,
};

export default HomeThreadAvatar;
