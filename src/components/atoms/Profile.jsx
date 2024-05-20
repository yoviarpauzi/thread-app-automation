import PropTypes from 'prop-types';

const Profile = ({avatar, listener}) => {
  return (
    <button className="flex justify-center items-center" onClick={listener}>
      <img
        src={avatar}
        className="w-8 rounded-full cursor-pointer"
        alt="profile"
      />
    </button>
  );
};

Profile.propTypes = {
  avatar: PropTypes.string,
  listener: PropTypes.func.isRequired,
};

export default Profile;
