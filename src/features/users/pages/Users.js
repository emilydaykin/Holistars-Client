import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../usersSlice';

const Users = () => {
  const users = useSelector(selectAllUsers);

  console.log(users);

  return (
    <section className='section-main'>
      <h1 className='section-main__title'>Users</h1>
    </section>
  );
};

export default Users;
