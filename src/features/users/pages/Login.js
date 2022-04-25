import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    <section className='login section-main'>
      <div className='container'>
        <h1 className='section-main__title'>Login</h1>
        <AuthForm login />
      </div>
    </section>
  );
};

export default Login;
