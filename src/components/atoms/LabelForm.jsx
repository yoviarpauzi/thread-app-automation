import PropTypes from 'prop-types';

const LabelForm = ({htmlFor, children}) => {
  return (
    <label htmlFor={htmlFor} className="text-orange-400">
      {children}
    </label>
  );
};

LabelForm.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LabelForm;
