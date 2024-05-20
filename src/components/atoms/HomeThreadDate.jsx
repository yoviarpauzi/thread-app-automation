import PropTypes from 'prop-types';

const HomeThreadDate = ({thread}) => {
  return (
    <p className="text-sm text-slate-500">
      {new Date(thread.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}
    </p>
  );
};

HomeThreadDate.propTypes = {
  thread: PropTypes.object,
};

export default HomeThreadDate;
