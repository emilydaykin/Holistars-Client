import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../usersSlice';

const SingleUser = () => {
  const { id } = useParams();

  const user = useSelector(state => selectUserById(state, Number(id)));

  return <div>SingleUser</div>;
};

export default SingleUser;
