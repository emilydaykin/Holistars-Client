import axios from 'axios';
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const getUserById = async (id) => {
  const options = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/authentication/details/${id}/`
  };

  const { data } = await axios.request(options);
  return data;
};
