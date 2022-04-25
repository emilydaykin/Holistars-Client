import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = () => {
  return (
    <section className='section-main'>
      <div className='container'>
        <h1 className='section-main__title'>Register</h1>
        <AuthForm />
      </div>
    </section>
  );
};

export default Register;
