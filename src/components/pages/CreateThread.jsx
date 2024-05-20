import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  asyncCreateThread,
  createThreadReset,
} from '../../states/actions/createThreadAction';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getAccessToken} from '../../utils/network-data';

const CreateThread = () => {
  const navigate = useNavigate('/');
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const {status, message} = useSelector((state) => state.createThread);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleInput = (e) => {
    setBody(e.target.innerText);
  };

  const handleSubmit = () => {
    dispatch(asyncCreateThread({title, body, category}));
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (status == 'fail') {
      window.alert(message);
      dispatch(createThreadReset());
    } else if (status == 'success') {
      dispatch(createThreadReset());
      navigate('/');
    }
  }, [dispatch, message, status, navigate]);

  return (
    <div className="flex flex-col gap-y-4 w-full bg-secondary p-4">
      <input
        placeholder="Title..."
        type="text"

        className="bg-secondary border border-slate-500 rounded-md text-4xl px-2 py-1 placeholder:text-slate-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Category..."
        type="text"

        className="bg-secondary border border-slate-500 rounded-md px-2 py-1 placeholder:text-slate-500"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <div
        contentEditable="true"

        className="w-full border border-slate-500 h-72 focus:outline-orange-500 rounded-md px-2 py-1 overflow-auto cursor-text relative"
        data-placeholder="Enter comment here..."
        onInput={handleInput}
      ></div>
      <button

        className="bg-tertiary border border-orange-500 py-1 rounded-md text-orange-500 hover:opacity-60"
        onClick={handleSubmit}
      >
        Publish
      </button>
    </div>
  );
};

export default CreateThread;
