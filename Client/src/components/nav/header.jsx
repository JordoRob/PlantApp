
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';


const Header = () => {
  const [current, setCurrent] = useState('h');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
    <div class='headerboy'>
    <h1><Link to="/">Plant Tracker </Link></h1>
      <div class='nav-bar'>
      <span>
        <Link to="/"> Home </Link>
      </span>
      <span><Link to="/login"> Login </Link></span>
      <span><Link to="/register"> Register </Link></span>
    </div>
    </div>
    <Outlet/>
    </>
  )
};
export default Header;