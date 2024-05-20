import PropTypes from 'prop-types';

const FormSplit = ({children}) => {
  return (
    <div>
      <p className="text-sm text-center">{children}</p>
    </div>
  );
};

FormSplit.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormSplit;
