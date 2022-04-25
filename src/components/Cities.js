import React, { useState, useEffect } from 'react';
import { searchCities } from '../api/cities_api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllCities } from '../features/cities/citiesSlice';
import { getAllCities } from '../api/cities_api';
import Stars from './Stars';

const Cities = () => {
  const allCitiesRedux = useSelector(selectAllCities);
  const [cities, setCities] = useState(null);

  const getCityAvgRating = (city) =>
    city.reviews.reduce((total, review) => total + review.avg_rating, 0) / city.reviews.length;

  useEffect(() => {
    const getCityData = async () => {
      const allCities = await getAllCities();
      const shuffledCities = allCities.sort(() => 0.5 - Math.random());
      setCities(shuffledCities);
    };
    getCityData();
  }, []);

  const continentColorCodes = {
    Asia: 'Indigo',
    Europe: 'DarkSlateBlue',
    'North America': 'DarkSlateGray',
    Africa: 'MidnightBlue',
    'Australia & Pacific': 'FireBrick',
    'South America': 'SaddleBrown'
  };

  const filterThroughCities = async (searchInput) => {
    // console.log('searchInput', searchInput);
    if (searchInput) {
      const filteredCities = await searchCities(searchInput);
      setCities(filteredCities);
    } else {
      setCities(allCitiesRedux);
    }
  };

  const handleSearchChange = (e) => {
    filterThroughCities(e.target.value);
  };

  return (
    <section className='cities'>
      <h1 className='cities__title'>Destinations</h1>
      <input
        className='input cities__search-bar'
        type='text'
        placeholder='Search city, country, continent, or recommended attractions...'
        onChange={handleSearchChange}
      ></input>
      <div className='cities__container'>
        {!cities ? (
          <p>Loading cities...</p>
        ) : (
          cities.map((city) => (
            <Link className='cities__city-card-link' to={`/destinations/${city.id}`} key={city.id}>
              <div className='card cities__city-card'>
                <div
                  className='cities__city-image'
                  style={{
                    backgroundImage: `url(${city.image})`,
                    backgroundSize: 'cover'
                  }}
                ></div>
                <div className='cities__city-text'>
                  <p className='cities__city-name'>{city.city}</p>
                  <div>
                    <span className='cities__country-name'>{city.country}</span>
                    ,&ensp;
                    <span
                      style={{
                        color: continentColorCodes[city.continent],
                        fontWeight: 300,
                        fontSize: '1.25rem'
                      }}
                    >
                      {city.continent}
                    </span>
                    {city.reviews?.length > 0 ? <Stars value={getCityAvgRating(city)} /> : ''}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default Cities;
