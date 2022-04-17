import axios from 'axios';

export const loginUser = async credentials => {
  const response = await axios.post(
    'http://localhost:8000/authentication/login/',
    {
      data: credentials,
    }
  );

  return response.data;
};
