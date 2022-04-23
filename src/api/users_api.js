import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api';

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getUserById = async (id) => {
  const options = {
    method: 'GET',
    url: `http://localhost:8000/api/authentication/details/${id}/`
  };

  const { data } = await axios.request(options);
  return data;
};
