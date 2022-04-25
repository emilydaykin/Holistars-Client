import React from 'react';
import Welcome from './Welcome';
import Feed from './Feed';
import { useSelector } from 'react-redux';


const Home = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  return Object.keys(userInfo).length === 0 ? <Welcome /> : <Feed />;
};

export default Home;
