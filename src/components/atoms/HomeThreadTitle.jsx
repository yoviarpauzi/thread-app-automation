import PropTypes from 'prop-types';

const HomeThreadTitle = ({thread}) => {
  return (
    <h1 className="text-lg text-wrap mb-2 break-words">
      {thread.title.length > 70 ?
        thread.title.substring(0, 71).concat('...') :
        thread.title}
    </h1>
  );
};

HomeThreadTitle.propTypes = {
  thread: PropTypes.object,
};

export default HomeThreadTitle;
