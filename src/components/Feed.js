import React, { useState, useEffect } from 'react';
import { selectAllCities } from '../features/cities/citiesSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Stars from './Stars';

const Feed = () => {
  const allCities = useSelector(selectAllCities);
  const [orderedReviews, setOrderedReviews] = useState(null);
  console.log('ALLCITIES', allCities);

  const reviewedCities = allCities.filter((city) => city.reviews.length > 0);
  console.log('REVIEWED', reviewedCities);

  useEffect(() => {
    const orderReviewsByDate = () => {
      const orderedReviewsByDate = reviewedCities
        ?.slice()
        .sort(
          (a, b) =>
            new Date(b.reviews[b.reviews.length - 1].created_date) -
            new Date(a.reviews[a.reviews.length - 1].created_date)
        );
      setOrderedReviews(orderedReviewsByDate);
    };
    orderReviewsByDate();
  }, [allCities]);

  // console.log('orderedReviews', orderedReviews);

  return (
    <section className='feed'>
      <h1 className='feed__title'>Latest Reviews</h1>
      {!orderedReviews ? (
        <p>Loading Feed...</p>
      ) : (
        <div className='feed__feed-container'>
          {orderedReviews.map((city) => (
            <Link
              className='feed__reviewed-city-link'
              key={city.id}
              to={`/destinations/${city.id}`}
            >
              <div className='card feed__reviewed-city'>
                <div className='feed__city-image-name'>
                  <div
                    className='feed__city-image'
                    style={{ backgroundImage: `url(${city.image})` }}
                  ></div>
                  <p className='feed__city-name'>
                    {city.city},&nbsp;<span>{city.country}</span>
                  </p>
                </div>
                <div className='feed__city-review'>
                  <p>"&nbsp;{city.reviews[city.reviews.length - 1].text}&nbsp;"</p>
                  <Stars value={city.reviews[city.reviews.length - 1].avg_rating} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Feed;
