import axios from 'axios';

export const getAllCities = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/api/cities/',
  };

  const { data } = await axios.request(options);
  return data;
};

export const searchCities = async search_term => {
  const options = {
    method: 'GET',
    url: `http://localhost:8000/api/cities/${search_term}/`,
  };

  const { data } = await axios.request(options);
  return data;
};

export const getCityById = async id => {
  const options = {
    method: 'GET',
    url: `http://localhost:8000/api/cities/${id}`,
  };

  const { data } = await axios.request(options);
  return data;
};
