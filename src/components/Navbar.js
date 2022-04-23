import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/login/loginSlice';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.userInfo);
  console.log(userInfo);

  const customNavbar = location => {
    // If path = home or singleCity, make navbar transparent:
    const pathElements = location.split('/');
    if (
      location === '/' ||
      (pathElements.length === 3 && pathElements[1] === 'destinations')
    ) {
      return true;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      className={customNavbar(location.pathname) ? 'header--custom' : 'header'}
    >
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
          <Link className='header__nav-item' to={'/create-holiday'}>
            Create Hol
          </Link>
          <Link className='header__nav-item' to={'/add-new-city-TEMP'}>
            Add City
          </Link>
        </div>
        <div className='header__nav-right'>
          {userInfo.id ? (
            <>
              <Link
                className='header__nav-item'
                to={`/authentication/${userInfo.id}`}
              >
                <img
                  src={userInfo.image}
                  alt={userInfo.user}
                  style={{ height: '30px' }}
                />
                {userInfo.user}
              </Link>
              <Link className='header__nav-item' to='#' onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className='header__nav-item' to='/login'>
                Login
              </Link>
              <Link className='header__nav-item' to='/register'>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
