import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/globe_logo.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = ({ shuffledCities }) => {
  const randomHeroImage = shuffledCities[Math.floor(Math.random() * 30)].fields.image;

  // Display 10 destinations from seed data:
  const destinationSubset = shuffledCities.slice(0, 10);

  const heroStyles = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.45)), url(${randomHeroImage})`,
    boxShadow: '0px 8px 25px 7px rgba(180,180,180,0.7)',
    height: '60vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const carouselSettings = {
    dots: true,
    autoplay: true,
    infinite: true,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <section className='home'>
      <div className='home__hero' style={heroStyles}>
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
        {/* <h3 className='home__heading'>Browse All Holiday Destinations ✈️</h3> */}
        <div className='home__carousel'>
          <Slider {...carouselSettings}>
            {destinationSubset.map((city) => (
              <div key={city.pk} className='home__carousel-item'>
                <Link className='home__carousel-link' to={`/cities/${city.id}`}>
                  <img src={city.fields.image} alt={city.fields.city} />
                  <p className='home__carousel-text'>
                    {city.fields.city}, {city.fields.country}
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
