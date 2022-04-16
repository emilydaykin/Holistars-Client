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
          {city.state ? <p>{city.state}&emsp;~&emsp;</p> : <p></p>}
          <p>{city.country}</p>
          &emsp;~&emsp;
          <p className='singleCity__continent'>{city.continent}</p>
        </div>
      </div>

      <div className='singleCity__top'>
        <div className='singleCity__details-container'>
          <div className='singleCity__details singleCity__details--description'>
            <h3>Description</h3>
            <p>{city.description}</p>
          </div>
          <div className='singleCity__details singleCity__details--attractions'>
            <h3>Top 3 Attactions</h3>
            <p className='singleCity__attractions-wrapper'>
              {city.top_3_attractions.map((attraction) => (
                <span className='singleCity__attractions'>{attraction}</span>
              ))}
            </p>
          </div>
        </div>

        <div className='singleCity__details singleCity__details--travellers-container'>
          <h3>Travellers who have been to {city.city}</h3>
        </div>
      </div>
      <div className='singleCity__details singleCity__details--reviews-container'>
        <h3>Reviews of {city.city}</h3>
      </div>
    </section>
  );
};

export default SingleCity;
