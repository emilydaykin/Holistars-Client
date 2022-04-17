import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    <section className='section-main'>
      <h1 className='section-main__title'>Login</h1>
      <AuthForm login />
    </section>
  );
};

export default Login;
