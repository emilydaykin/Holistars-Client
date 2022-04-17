import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllUsers, fetchUsers } from '../usersSlice';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log('dispatched', users);

  return (
    <section className='section-main'>
      <h1 className='section-main__title'>Users</h1>
    </section>
  );
};

export default Users;
