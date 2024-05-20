import {Link} from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <Link to={`/`}>
      <div className="p-1 border-2 border-orange-500">
        <p className="text-orange-500 font-bold">NF</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
