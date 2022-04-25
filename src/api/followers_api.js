import axios from 'axios';

export const followTraveller = async (body) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/api/followers/',
    data: body
  };
  const { data } = await axios.request(options);
  return data;
};
