import axios from 'axios';

export const scrapeSearch = async (body) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/api/scrape/search/',
    data: body
  };
  const { data } = await axios.request(options);
  return data;
};

export const scrapeCities = async (body) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/api/scrape/cities/',
    data: body
  };
  const { data } = await axios.request(options);
  return data;
};
