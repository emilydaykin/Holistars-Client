import axios from 'axios';

export const getAllCities = async () => {
  const options = {
    method: 'GET',
    url: '/cities/'
  };

  const { data } = await axios.request(options);
  return data;
};

export const searchCities = async (search_term) => {
  const options = {
    method: 'GET',
    url: `/cities/${search_term}/`
  };

  const { data } = await axios.request(options);
  return data;
};
