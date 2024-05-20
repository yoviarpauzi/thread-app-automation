import {Outlet} from 'react-router-dom';
import NavHome from './NavHome';

const Main = () => {
  return (
    <main className="container">
      <div className="py-20 mx-auto flex justify-between">
        <NavHome />
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
