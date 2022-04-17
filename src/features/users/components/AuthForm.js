import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../usersSlice';
import { loginUser } from '../../../api/users_api';

const AuthForm = ({ login }) => {
  const dispatch = useDispatch();
  const initialLoginlUser = {
    email: '',
    password: '',
  };

  const initialRegisterlUser = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    image: '',
    bio: '',
  };

  const [user, setUser] = useState(
    login ? initialLoginlUser : initialRegisterlUser
  );

  const handleFormChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(user);

  const handleLogin = e => {
    e.preventDefault();
    axios
      .request({
        method: 'POST',
        url: 'http://localhost:8000/authentication/login/',
        data: user,
      })
      .then(({ data }) => {
        data.token
          ? window.sessionStorage.setItem('token', data.token)
          : window.sessionStorage.removeItem('token');

        return data;
      })
      .catch(console.error);
  };

  const handleRegister = e => {
    e.preventDefault();
    try {
      dispatch(registerUser(user));
    } catch (err) {
      console.error('Failed to register user', err);
    }
    // axios
    //   .request({
    //     method: 'POST',
    //     url: 'http://localhost:8000/authentication/login/',
    //     data: user,
    //   })
    //   .then(({ data }) => {
    //     data.token
    //       ? window.sessionStorage.setItem('token', data.token)
    //       : window.sessionStorage.removeItem('token');

    //     return data;
    //   })
    //   .catch(console.error);
  };

  return (
    <form>
      {!login && (
        <div className='form-control'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={user.username}
            onChange={handleFormChange}
          />
        </div>
      )}
      <div className='form-control'>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={user.email}
          onChange={handleFormChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={user.password}
          onChange={handleFormChange}
        />
      </div>
      {!login && (
        <>
          <div className='form-control'>
            <label htmlFor='password_confirmation'>Confirm Password:</label>
            <input
              type='password'
              id='password_confirmation'
              name='password_confirmation'
              value={user.password_confirmation}
              onChange={handleFormChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='image'>Image:</label>
            <input
              type='text'
              id='image'
              name='image'
              value={user.image}
              onChange={handleFormChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='bio'>Bio:</label>
            <textarea
              id='bio'
              name='bio'
              value={user.bio}
              onChange={handleFormChange}
            ></textarea>
          </div>
        </>
      )}
      {login ? (
        <button type='submit' onClick={handleLogin}>
          Login
        </button>
      ) : (
        <button type='submit' onClick={handleRegister}>
          Register
        </button>
      )}
    </form>
  );
};

export default AuthForm;
