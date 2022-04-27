import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/login/loginSlice';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const customNavbar = (location) => {
    const pathElements = location.split('/');
    if (pathElements.length === 3 && pathElements[1] === 'destinations') {
      return true;
    } else if (location === '/') {
      return Object.keys(userInfo).length === 0 ? true : false;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
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
        </div>
        <div className='header__nav-right'>
          {userInfo?.id ? (
            <>
              <Link
                className='header__nav-item header__nav-item--pic'
                to={`/profile/${userInfo.id}`}
              >
                <img
                  className='header__nav-item-img'
                  src={userInfo.image}
                  alt={userInfo.user}
                  style={{ height: '30px', width: '30px', objectFit: 'cover', borderRadius: '5px' }}
                />
                {userInfo.user}
              </Link>
              <Link className='header__nav-item' to='#' onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : sessionStorage.getItem('userInfo') ? (
            <>
              <Link
                className='header__nav-item header__nav-item--pic'
                to={`/profile/${JSON.parse(sessionStorage.getItem('userInfo')).id}`}
              >
                <img
                  className='header__nav-item-img'
                  src={JSON.parse(sessionStorage.getItem('userInfo')).image}
                  alt={JSON.parse(sessionStorage.getItem('userInfo')).user}
                  style={{ height: '30px', width: '30px', objectFit: 'cover', borderRadius: '5px' }}
                />
                {JSON.parse(sessionStorage.getItem('userInfo')).user}
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
