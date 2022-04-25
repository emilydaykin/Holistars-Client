import axios from 'axios';

export const followTraveller = async (body) => {
  const options = {
    method: 'POST',
    url: '${process.env.REACT_APP_API_URL}/followers/',
    data: body
  };
  const { data } = await axios.request(options);
  return data;
};
