import PropTypes from 'prop-types';

const FormTitle = ({children}) => {
  return (
    <h1 className="text-center text-3xl font-bold text-orange-500">
      {children}
    </h1>
  );
};

FormTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default FormTitle;
