import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/authentication/')
      .then(({ data }) => console.log(data));
  }, []);

  return (
    <section className='section-main'>
      <h1 className='section-main__title'>Users</h1>
    </section>
  );
};

export default Users;
