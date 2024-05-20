import {useEffect, useState} from 'react';
import LoadingBar from 'react-redux-loading-bar';
import FormTemplate from '../templates/FormTemplate';
import ButtonSubmit from '../atoms/ButtonSubmit';
import InputFormContainer from '../molecules/InputFormContainer';
import FormSplit from '../molecules/FormSplit';
import {Link, useNavigate} from 'react-router-dom';
import FormTitle from '../atoms/FormTitle';
import {useDispatch} from 'react-redux';
import {asyncLogin, loginReset} from '../../states/actions/loginAction';
import {useSelector} from 'react-redux';
import {putAccessToken} from '../../utils/network-data';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {data, status, message} = useSelector((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (status == 'fail') {
      window.alert(message);
      dispatch(loginReset());
    } else if (status == 'success') {
      putAccessToken(data);
      dispatch(loginReset());
      navigate('/');
    }
  }, [data, status, message, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncLogin({email, password}));
  };

  return (
    <>
      <LoadingBar showFastActions />
      <FormTemplate>
        <FormTitle>Login</FormTitle>
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
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
          <ButtonSubmit>Login</ButtonSubmit>
        </form>

        <FormSplit>
          Don&apos;t have an account?{' '}
          <Link to={`/register`} className="text-orange-500">
            Register
          </Link>
        </FormSplit>
      </FormTemplate>
    </>
  );
};

export default Login;
