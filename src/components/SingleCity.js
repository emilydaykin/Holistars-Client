import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCityById } from '../api/cities_api';

const SingleCity = () => {
  const [city, setCity] = useState(null);
  const { id } = useParams();
  console.log('id', id);

  useEffect(() => {
    const getCity = async () => {
      const destination = await getCityById(id);
      setCity(destination);
    };
    getCity();
  }, [id]);

  if (!city) return <p>Loading city...</p>;
  return (
    <section
      className='singleCity'
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${city.image})`
      }}
    >
      <div className='singleCity__geography'>
        <h1 className='singleCity__title'>{city.city}</h1>
        <div className='singleCity__subtitle'>
          {city.state ? <p>{city.state}</p> : <p></p>}
          <p>{city.country}</p>
          <p>{city.continent}</p>
        </div>
      </div>
    </section>
  );
};

export default SingleCity;
