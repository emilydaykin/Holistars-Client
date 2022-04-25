import axios from 'axios';

export const addHoliday = async (holidayDetails) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/api/holidays/',
    data: holidayDetails
  };
  const { data } = await axios.request(options);
  return data;
};
