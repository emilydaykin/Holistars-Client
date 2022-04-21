import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../usersSlice';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../api/users_api';

const AuthForm = ({ login }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const [previewSource, setPreviewSource] = useState();

  const handleFormChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    e.preventDefault();
    axios
      .request({
        method: 'POST',
        url: 'http://localhost:8000/api/authentication/login/',
        data: user,
      })
      .then(({ data }) => {
        data.token
          ? window.sessionStorage.setItem('token', data.token)
          : window.sessionStorage.removeItem('token');

        return data;
      })
      .catch(console.error);
    navigate('/');
  };

  const handleImage = async e => {
    const image = e.target.files[0];
    previewImage(image);
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'mx89penn');
    const { data } = await axios.post(
      'https://api.cloudinary.com/v1_1/holistars/image/upload',
      formData
    );
    setUser({ ...user, image: data.url });
  };

  const previewImage = image => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  };

  console.log(user);

  const handleRegister = e => {
    try {
      dispatch(registerUser(user));
    } catch (err) {
      console.error('Failed to register user', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
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
                type='file'
                id='image'
                name='image'
                onChange={handleImage}
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
          <button type='submit'>Register</button>
        )}
      </form>
      {previewSource && (
        <img src={previewSource} style={{ height: '300px' }} alt='' />
      )}
    </div>
  );
};

export default AuthForm;
