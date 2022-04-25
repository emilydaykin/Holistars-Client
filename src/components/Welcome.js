import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/globe_logo.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { selectAllCities } from '../features/cities/citiesSlice';
import { useSelector } from 'react-redux';

const Welcome = () => {
  const allCities = useSelector(selectAllCities);
  const [cities, setCities] = useState(null);
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
    const getRandomImg = allCities[Math.floor(Math.random() * 30)]?.image;
    setRandomImage(getRandomImg);
    const sortedCities = allCities.slice().sort(() => 0.5 - Math.random());
    setCities(sortedCities.slice(0, 10));
  }, [allCities]);

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
    <section className='welcome'>
      <div
        className='welcome__hero'
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.45)), 
        url(${randomImage})`
        }}
      >
        <img className='welcome__hero-logo' src={logo} alt='logo' />
        <div className='welcome__text'>
          <h1 className='welcome__title'>Holistars</h1>
          <p className='welcome__subtitle'>The Social Media Hub for Travellers</p>
          <Link to={'/destinations'} className='button welcome__button'>
            Browse All Destinations
          </Link>
        </div>
      </div>
      <div className='welcome__destinations'>
        <div className='welcome__carousel'>
          <Slider {...carouselSettings}>
            {cities.map((city) => (
              <div key={city.id} className='welcome__carousel-item'>
                <Link className='welcome__carousel-link' to={`/destinations/${city.id}`}>
                  <img src={city.image} alt={city.city} />
                  <p className='welcome__carousel-text'>
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

export default Welcome;
