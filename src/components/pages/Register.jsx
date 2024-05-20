import {useEffect, useState} from 'react';
import InputFormContainer from '../molecules/InputFormContainer';
import ButtonSubmit from '../atoms/ButtonSubmit';
import {Link, useNavigate} from 'react-router-dom';
import FormTemplate from '../templates/FormTemplate';
import FormSplit from '../molecules/FormSplit';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  asyncRegister,
  registerReset,
} from '../../states/actions/registerAction';
import LoadingBar from 'react-redux-loading-bar';
import FormTitle from '../atoms/FormTitle';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {status, message} = useSelector((state) => state.register);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (status == 'fail') {
      window.alert(message);
      dispatch(registerReset());
    } else if (status == 'success') {
      dispatch(registerReset());
      navigate('/login');
    }
  }, [status, dispatch, message, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword != password) {
      window.alert('Confirm password must be same with password!');
      return;
    } else {
      dispatch(asyncRegister({name, email, password}));
    }
  };

  return (
    <>
      <LoadingBar showFastActions />
      <FormTemplate>
        <FormTitle>Register</FormTitle>
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
          <InputFormContainer
            htmlFor="name"
            labelChildren="Name"
            type="text"
            id="name"
            value={name}
            listener={(e) => setName(e.target.value)}
          />
          <InputFormContainer
            htmlFor="email"
            labelChildren="Email"
            type="email"
            id="email"
            value={email}
            listener={(e) => setEmail(e.target.value)}
          />
          <InputFormContainer
            htmlFor="password"
            labelChildren="Password"
            type="password"
            id="password"
            value={password}
            listener={(e) => setPassword(e.target.value)}
          />
          <InputFormContainer
            htmlFor="confirm-password"
            labelChildren="Confirm Password"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            listener={(e) => setConfirmPassword(e.target.value)}
          />
          <ButtonSubmit>Register</ButtonSubmit>
        </form>

        <FormSplit>
          Do you have an account?{' '}
          <Link to={`/login`} className="text-orange-500">
            Login
          </Link>
        </FormSplit>
      </FormTemplate>
    </>
  );
};

export default Register;
