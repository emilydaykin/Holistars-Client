import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { getUserById } from '../api/users_api';
// import { getAllCities, getCityById } from '../api/cities_api';
import { Link } from 'react-router-dom';
import { selectAllCities } from '../features/cities/citiesSlice';
import { useSelector } from 'react-redux';
import { selectUserById } from '../features/users/usersSlice';

const Profile = () => {
  const { id } = useParams();
  console.log('ID', id);

  const allCities = useSelector(selectAllCities);
  const user = useSelector((state) => selectUserById(state, Number(id)));
  const [orderedUserHolidays, setOrderedUserHolidays] = useState([]);

  const prettifyDate = (dateString) => {
    const year = dateString.split('/')[1];
    const month = dateString.split('/')[0];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    return `${months[Number(month) - 1]} ${year}`;
  };

  useEffect(() => {
    const orderHolidaysByDate = () => {
      console.log('orderhols');
      const orderedHolidays = user?.holidays
        .slice()
        .sort((a, b) => new Date(prettifyDate(b.date)) - new Date(prettifyDate(a.date)));
      setOrderedUserHolidays(orderedHolidays);
    };
    orderHolidaysByDate();
  }, [id, user?.holidays]);

  const findCity = (cityId) => {
    return allCities.find((city) => city.id === cityId);
  };

  return (
    <section className='profile'>
      {/* <h1 className='profile__title'>Profile Page</h1> */}
      {!user || !orderedUserHolidays ? (
        <p></p>
      ) : (
        <div className='profile__container'>
          <div className='profile__info'>
            <img
              className='profile__profile-picture'
              src={user.image}
              alt='user profile image'
              width='250px'
            />
            <h2 className='profile__heading'>
              {user.first_name} {user.last_name}
            </h2>
            <div className='profile__follows'>
              <div className='profile__connections profile__connections--followers'>
                <h3>Followers</h3>
                <p>{user.followers.length}</p>
              </div>
              <div className='profile__connections profile__connections--followings'>
                <h3>Following</h3>
                <p>{user.followings.length}</p>
              </div>
            </div>
            <div className='profile__bio-and-destinations'>
              <h3 className='profile__sub-title'>Bio</h3>
              <p>{user.bio}</p>
              <h3 className='profile__sub-title'>Total Destinations</h3>
              <p>
                {user.holidays.length}&nbsp;
                {user.holidays.length === 1 ? 'holiday' : 'holidays'} so far
              </p>
              <p>
                {user.reviews.length}&nbsp;
                {user.holidays.length === 1 ? 'review' : 'reviews'} so far
              </p>
            </div>
          </div>
          <div className='profile__timeline-section'>
            {/* <h1 className='profile__title'>My holidays</h1> */}
            <div className='profile_timeline-container'>
              <div
                className={orderedUserHolidays.length > 1 ? 'profile__line' : 'hide'}
                style={{ height: `${120 * orderedUserHolidays.length - 1}px` }}
              ></div>
              {orderedUserHolidays.map((holiday) => (
                <div key={holiday.id} className='profile__timeline-row'>
                  <div className='profile__circle'>
                    <div className='profile__circle profile__circle--inner'></div>
                  </div>
                  <Link
                    className='profile__timeline-entry-link'
                    to={`/destinations/${holiday.city.id}`}
                  >
                    <div className='profile__timeline-entry'>
                      <div
                        className='profile__holiday-image'
                        style={{ backgroundImage: `url(${findCity(holiday.city).image})` }}
                      ></div>
                      <div className='profile__holiday-text'>
                        <p className='profile__destination'>
                          {findCity(holiday.city).city}, {findCity(holiday.city).country}
                        </p>
                        <p className='profile__date'>{prettifyDate(holiday.date)}</p>
                        <p className='profile__duration'>{holiday.duration}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
