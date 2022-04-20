import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/globe_logo.png';
import { getAllCities } from '../api/cities_api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const [cities, setCities] = useState(null);

  useEffect(() => {
    const getCityData = async () => {
      const allCities = await getAllCities();
      const sortedCities = allCities.sort((a, b) => a.city.localeCompare(b.city));
      setCities(sortedCities);
    };
    getCityData();
  }, []);

  const carouselSettings = {
    dots: true,
    autoplay: true,
    infinite: true,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return !cities ? (
    <p></p>
  ) : (
    <section className='home'>
      <div
        className='home__hero'
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.45)), 
        url(${cities[Math.floor(Math.random() * 30)].image})`
        }}
      >
        <img className='home__hero-logo' src={logo} alt='logo' />
        <div className='home__text'>
          <h1 className='home__title'>Holistars</h1>
          <p className='home__subtitle'>The Social Media Hub for Travellers</p>
          <Link to={'/destinations'} className='button home__button'>
            Browse All Destinations
          </Link>
        </div>
      </div>
      <div className='home__destinations'>
        <div className='home__carousel'>
          <Slider {...carouselSettings}>
            {cities.map((city) => (
              <div key={city.id} className='home__carousel-item'>
                <Link className='home__carousel-link' to={`/cities/${city.id}`}>
                  <img src={city.image} alt={city.city} />
                  <p className='home__carousel-text'>
                    {city.city}, {city.country}
                  </p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Home;
