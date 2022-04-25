import axios from 'axios';

export const getAllCities = async () => {
  const options = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/cities/`
  };

  const { data } = await axios.request(options);
  return data;
};

export const searchCities = async (search_term) => {
  const options = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/cities/${search_term}/`
  };

  const { data } = await axios.request(options);
  return data;
};

export const getCityById = async (id) => {
  const options = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/cities/${id}`
  };

  const { data } = await axios.request(options);
  return data;
};

export const addCity = async (body) => {
  const options = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/cities/`,
    data: body
  };

  const { data } = await axios.request(options);
  return data;
};
