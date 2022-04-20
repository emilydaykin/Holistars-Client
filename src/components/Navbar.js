import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();

  console.log('location', location);

  const customNavbar = (location) => {
    // If path = home or singleCity, make navbar transparent:
    const pathElements = location.split('/');
    if (location === '/' || (pathElements.length === 3 && pathElements[1] === 'destinations')) {
      return true;
    }
  };

  console.log('SCROLL', window.scrollY);

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
          {/* Will only be visible to admins */}
          <Link className='header__nav-item' to={'/users'}>
            Users
          </Link>
        </div>
        <div className='header__nav-right'>
          {/* Dont see how it would work hahahahah. I'm too dumb for this trickery! */}
          <Link className='header__nav-item' to={'#'}>
            Sign In/Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
