import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='header'>
      <nav className='header__navbar'>
        <div className='header__nav-left'>
          <Link className='header__nav-item' to={'/'}>
            Home
          </Link>
          <Link className='header__nav-item' to={'/cities'}>
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
