import axios from 'axios';

// "proxy": "http://localhost:8000",

export const getAllCities = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/cities/',
  };

  const { data } = await axios.request(options);
  return data;
};

export const searchCities = async search_term => {
  const options = {
    method: 'GET',
    url: `http://localhost:8000/cities/${search_term}/`,
  };

  const { data } = await axios.request(options);
  return data;
};
