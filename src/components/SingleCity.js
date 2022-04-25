import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getCityById } from '../api/cities_api';
import { selectAllUsers } from '../features/users/usersSlice';
import { followTraveller } from '../api/followers_api';

const SingleCity = () => {
  const [travellersDivHeight, setTravellersDivHeight] = useState(0);
  const [city, setCity] = useState(null);
  const [travellers, setTravellers] = useState([]);
  const loggedInUser = useSelector((state) => state.userInfo.userInfo);
  const userInfo = typeof loggedInUser === 'string' ? JSON.parse(loggedInUser) : loggedInUser;

  // console.log('USERINFO', userInfo);

  const { id } = useParams(); // city id
  const users = useSelector(selectAllUsers);
  const detailsContainers = useRef(null);

  const getUserDetails = userId =>
    users.find(user => Number(user.id) === Number(userId));

  useEffect(() => {
    const getHeight = () => {
      const childNodesHeight =
        detailsContainers.current &&
        [...detailsContainers.current.childNodes].reduce(
          (prevElement, current) =>
            prevElement + current.getBoundingClientRect().height,
          0
        );
      setTravellersDivHeight(childNodesHeight + 17); // 1.5em
    };
    window.addEventListener('resize', getHeight);
    getHeight();
  }, [city]);

  useEffect(() => {
    const getCityTravellers = () => {
      /** Users who've been to this city */
      const filteredTravellers = users.filter(user => {
        return (
          user.holidays.filter(hol => Number(hol.city) === Number(id)).length >
          0
        );
      });
      setTravellers(filteredTravellers);
    };
    getCityTravellers();
  }, [id, users]);

  useEffect(() => {
    const getCity = async () => {
      const destination = await getCityById(id);
      setCity(destination);
    };
    getCity();
  }, [id]);

  const followUser = travellerID => {
    console.log('Follow button CLICKED!');
    console.log(`User (being followed) ID: ${travellerID}`); // user being followed!
    if (userInfo) {
      const follower = userInfo.id;
      console.log(`User (follower) ID: ${follower}`);
      followTraveller({
        user: travellerID,
        follower: follower
      });
    }
  };

  function getStars(rating) {
    const numberOfStars = Math.round(Number(rating));
    switch (numberOfStars) {
      case 1:
        return '⭐️';
      case 2:
        return '⭐️⭐️';
      case 3:
        return '⭐️⭐️⭐️';
      case 4:
        return '⭐️⭐️⭐️⭐️';
      case 5:
        return '⭐️⭐️⭐️⭐️⭐️';
      default:
        return '';
    }
  }

  if (!city) return <p>Loading city...</p>;
  return (
    <section
      className='singleCity'
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${city.image})`,
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
        <div className='singleCity__details-container' ref={detailsContainers}>
          <div className='singleCity__details singleCity__details--description'>
            <h3>Description</h3>
            <p>{city.description}</p>
          </div>
          <div className='singleCity__details singleCity__details--attractions'>
            <h3>Top 3 Attactions</h3>
            <p className='singleCity__attractions-wrapper'>
              {city.top_3_attractions.map((attraction) => (
                <span key={attraction} className='singleCity__attractions'>
                  {attraction}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div
          className='singleCity__details singleCity__details--travellers-container'
          style={{ height: `${travellersDivHeight}px` }}
        >
          <h3>Travellers who have been to {city.city}</h3>
          <div className='singleCity__travellers'>
            {travellers.length === 0 ? (
              <p>No travellers yet. Be the first!</p>
            ) : (
              travellers.map((traveller) => (
                <div key={traveller.id} className='singleCity__traveller'>
                  <Link to={`/profile/${traveller.id}`} className='singleCity__traveller-name'>
                    <div
                      className='singleCity__traveller-image'
                      style={{ backgroundImage: `url(${traveller.image})` }}
                    ></div>
                    <div className='singleCity__traveller-name'>
                      {traveller.first_name} {traveller.last_name}
                    </div>
                  </Link>
                  {Object.keys(userInfo).length !== 0 && (
                    <button
                      className='button singleCity__follow-traveller'
                      onClick={() => followUser(traveller.id)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className='singleCity__details singleCity__details--reviews-container'>
        <h3>Reviews of {city.city}</h3>
        <Link to={`/review/${id}`}>Add a review</Link>
        <div className='singleCity__reviews'>
          {city.reviews.length === 0 ? (
            <p>No reviews for {city.city}. Be the first to leave one!</p>
          ) : (
            city.reviews.map((review) => (
              <div key={review.id} className='singleCity__review'>
                <p>"{review.text}"</p>
                <div className='singleCity__review-ratings'>
                  <p>
                    Food <span>{getStars(review.rating_food)}</span>
                  </p>
                  <p>
                    Weather <span>{getStars(review.rating_weather)}</span>
                  </p>
                  <p>
                    Culture <span>{getStars(review.rating_culture)}</span>
                  </p>
                </div>
                <p>
                  <span className='singleCity__reviewer'>
                    {getUserDetails(review.user)?.first_name}
                    {getUserDetails(review.user)?.last_name}
                  </span>
                  &emsp;~&emsp;
                  <span className='singleCity__review-date'>{review.created_date}</span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleCity;
