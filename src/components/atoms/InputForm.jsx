import PropTypes from 'prop-types';

const InputForm = ({type, id, value, listener}) => {
  return (
    <input
      type={type}
      id={id}
      required
      value={value}
      onChange={listener}
      className="bg-secondary border border-gray-500 rounded-md text-sm py-1 px-2 outline-orange-500"
      autoComplete="off"
    />
  );
};

InputForm.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  listener: PropTypes.func.isRequired,
};

export default InputForm;
