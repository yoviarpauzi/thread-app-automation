import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {Provider} from 'react-redux';
import store from './store.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Register from './components/pages/Register.jsx';
import Login from './components/pages/Login.jsx';
import Home from './components/pages/Home.jsx';
import ErrorPage from './components/pages/ErrorPage.jsx';
import Leaderboard from './components/pages/Leaderboard.jsx';
import DetailThread from './components/pages/DetailThread.jsx';
import CreateThread from './components/pages/CreateThread.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />,
      },
      {
        path: '/create',
        element: <CreateThread />,
      },
      {
        path: '/thread/:threadId',
        element: <DetailThread />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </React.StrictMode>,
);
