import axios from 'axios';

export const scrapeSearch = async (body) => {
  const options = {
    method: 'POST',
    url: '${process.env.REACT_APP_API_URL}/scrape/search/',
    data: body
  };
  const { data } = await axios.request(options);
  return data;
};

export const scrapeCities = async (body) => {
  const options = {
    method: 'POST',
    url: '${process.env.REACT_APP_API_URL}/scrape/cities/',
    data: body
  };
  const { data } = await axios.request(options);
  return data;
};
