import PropTypes from 'prop-types';

const TagHome = ({tags, listener}) => {
  return (
    <>
      <h1>Tags</h1>
      <div className="grid grid-cols-2 auto-rows-auto gap-x-3 gap-y-5 mt-2">
        {tags &&
          tags.map((tag, index) => (
            <button
              key={index}
              className="p-1 text-sm rounded-xl border border-orange-500 text-wrap break-words"
              onClick={() => {
                listener(tag);
              }}
            >
              #{tag}
            </button>
          ))}
      </div>
    </>
  );
};

TagHome.propTypes = {
  tags: PropTypes.array,
  listener: PropTypes.func.isRequired,
};

export default TagHome;
