import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../features/users/usersSlice';
import jwtDecode from 'jwt-decode';

const Navbar = () => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('token') ? true : false);

  const token = loggedIn && jwtDecode(sessionStorage.getItem('token'));
  const user = useSelector((state) => selectUserById(state, Number(token?.sub)));

  console.log(user);

  const customNavbar = (location) => {
    // If path = home or singleCity, make navbar transparent:
    const pathElements = location.split('/');
    if (location === '/' || (pathElements.length === 3 && pathElements[1] === 'destinations')) {
      return true;
    }
  };

  return (
    <header className={customNavbar(location.pathname) ? 'header--custom' : 'header'}>
      <nav className='header__navbar'>
        <div className='header__nav-left'>
          <Link className='header__nav-item' to={'/'}>
            Home
          </Link>
          <Link className='header__nav-item' to={'/about'}>
            About
          </Link>
          <Link className='header__nav-item' to={'/destinations'}>
            Destinations
          </Link>
          <Link className='header__nav-item' to={'/profile/3'}>
            Profile
          </Link>
          {/* Will only be visible to admins */}
          <Link className='header__nav-item' to={'/users'}>
            Users
          </Link>
        </div>
        <div className='header__nav-right'>
          <Link className='header__nav-item' to={'/register'}>
            Register
          </Link>
          <Link className='header__nav-item' to={'/login'}>
            Log In
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
