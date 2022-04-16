import React, { useState } from 'react';

const Cities = ({ shuffledCities }) => {
  const [cities, setCities] = useState(shuffledCities);
  const [searchInput, setSearchInput] = useState('');

  const continentColorCodes = {
    Asia: 'Indigo',
    Europe: 'DarkSlateBlue',
    'North America': 'DarkSlateGray',
    Africa: 'MidnightBlue',
    'Australia & Pacific': 'FireBrick',
    'South America': 'SaddleBrown'
  };

  const handleSearchChange = (e) => {
    console.log('search', e.target.value);
    setSearchInput(e.target.value);
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
        {cities.map((city) => (
          <div className='cities__city-card' key={city.pk}>
            <div
              className='cities__city-image'
              style={{
                backgroundImage: `url(${city.fields.image})`,
                backgroundSize: 'cover'
              }}
            ></div>
            <div className='cities__city-text'>
              <p className='cities__city-name'>{city.fields.city}</p>
              <p>
                <span className='cities__country-name'>{city.fields.country}</span>
                ,&ensp;
                <span
                  style={{
                    color: continentColorCodes[city.fields.continent],
                    fontWeight: 300,
                    fontSize: '1.25rem'
                  }}
                >
                  {city.fields.continent}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cities;
