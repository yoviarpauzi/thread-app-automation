import InputForm from '../atoms/InputForm';
import LabelForm from '../atoms/LabelForm';
import PropTypes from 'prop-types';

const InputFormContainer = ({
  htmlFor,
  labelChildren,
  type,
  id,
  value,
  listener,
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <LabelForm htmlFor={htmlFor}>{labelChildren}</LabelForm>
      <InputForm type={type} id={id} value={value} listener={listener} />
    </div>
  );
};

InputFormContainer.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  labelChildren: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  listener: PropTypes.func.isRequired,
};

export default InputFormContainer;
