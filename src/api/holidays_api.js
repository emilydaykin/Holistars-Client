import axios from 'axios';

export const addHoliday = async (holidayDetails) => {
  const options = {
    method: 'POST',
    url: '${process.env.REACT_APP_API_URL}/holidays/',
    data: holidayDetails
  };
  const { data } = await axios.request(options);
  return data;
};
