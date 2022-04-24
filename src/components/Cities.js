import React, { useState, useEffect } from 'react';
import { searchCities } from '../api/cities_api';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectAllUsers, selectUserById } from '../features/users/usersSlice';
// import { selectAllCities } from '../features/cities/citiesSlice';
// import { filterCities } from '../features/cities/citiesSlice';
import { getAllCities } from '../api/cities_api';

const Cities = () => {
  // const allCities = useSelector(selectAllCities);
  const [cities, setCities] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  // const users = useSelector((state) => selectUserById(state, Number(3)));
  // const users = useSelector(selectAllUsers);
  // console.log('USERS', users);

  // console.log('CITIES', cities);

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

  const filterThroughCities = async () => {
    const filteredCities = await searchCities(searchInput);
    // const filteredCities = filterCities(searchInput);
    setCities(filteredCities);
  };

  const handleSearchChange = (e) => {
    console.log('search', e.target.value);
    setSearchInput(e.target.value);
    filterThroughCities();
    // filterCities(e.target.value);
  };

  console.log(searchInput);

  return (
    <section className='cities'>
      <h1 className='cities__title'>Destinations</h1>
      <input
        className='input cities__search-bar'
        type='text'
        placeholder='Search city, country, continent, or recommended attractions...'
        onChange={handleSearchChange}
        value={searchInput}
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
                  <p>
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
                  </p>
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
