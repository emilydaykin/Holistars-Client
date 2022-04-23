import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../api/users_api';
import { getAllCities, getCityById } from '../api/cities_api';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  console.log('ID', id);
  const [userProfile, setUserProfile] = useState(null);
  const [cities, setCities] = useState(null);
  const [userCities, setUserCities] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserById(id);
      user.holidays.map(async (holiday) => {
        holiday.city = await getCityById(holiday.city);
      });
      setUserProfile(user);
    };
    getUser();
  }, [id]);

  // THIS USE.EFFECT's CONTENTS NEVER GET USED BUT ARE NEEDED
  // FOR THE ABOVE USE EFFECT TO DISPLAY ON SITE ?!
  useEffect(() => {
    // const userHolidayCities = userProfile?.holidays.map((hol) => hol.city);
    const getUserCities = async () => {
      const allCities = await getAllCities();
      // const userHols = allCities.filter((city) => userHolidayCities?.includes(city.id));
      setUserCities(allCities);
    };
    getUserCities();
  }, [id, userProfile]);

  // useEffect(() => {
  //   const getCities = async () => {
  //     const allCities = await getAllCities();
  //     setCities(allCities);
  //   };
  //   getCities();
  // }, [id]);

  // console.log('CITIES', cities);

  // useEffect(() => {
  //   setUserCities(cities?.filter((city) => userProfile?.holidays.includes(city.id)));
  // }, [cities, userProfile?.holidays]);

  // console.log('userCities', userCities);

  // console.log('userProfile', userProfile);

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

  const orderHolidaysByDate = () => {
    // sorry marco :D
    console.log('orderhols');
    const orderedHolidays = userProfile?.holidays.sort(
      (a, b) => new Date(prettifyDate(b.date)) - new Date(prettifyDate(a.date))
    );
    return orderedHolidays;
  };
  orderHolidaysByDate();

  return (
    <section className='profile'>
      {/* <h1 className='profile__title'>Profile Page</h1> */}
      {!userProfile ? (
        <p></p>
      ) : (
        <div className='profile__container'>
          <div className='profile__info'>
            <img
              className='profile__profile-picture'
              src={userProfile.image}
              alt='user profile image'
              width='250px'
            />
            <h2 className='profile__heading'>
              {userProfile.first_name} {userProfile.last_name}
            </h2>
            <div className='profile__follows'>
              <div className='profile__connections profile__connections--followers'>
                <h3>Followers</h3>
                <p>{userProfile.followers.length}</p>
              </div>
              <div className='profile__connections profile__connections--followings'>
                <h3>Following</h3>
                <p>{userProfile.followings.length}</p>
              </div>
            </div>
            <div className='profile__bio-and-destinations'>
              <h3 className='profile__sub-title'>Bio</h3>
              <p>{userProfile.bio}</p>
              <h3 className='profile__sub-title'>Total Destinations</h3>
              <p>
                {userProfile.holidays.length}&nbsp;
                {userProfile.holidays.length === 1 ? 'holiday' : 'holidays'} so far
              </p>
              <p>
                {userProfile.reviews.length}&nbsp;
                {userProfile.holidays.length === 1 ? 'review' : 'reviews'} so far
              </p>
            </div>
          </div>
          <div className='profile__timeline-section'>
            {/* <h1 className='profile__title'>My holidays</h1> */}
            <div className='profile_timeline-container'>
              <div
                className={userProfile.holidays.length > 1 ? 'profile__line' : 'hide'}
                style={{ height: `${120 * userProfile.holidays.length - 1}px` }}
              ></div>
              {userProfile.holidays.map((holiday) => (
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
                        style={{ backgroundImage: `url(${holiday.city.image})` }}
                      ></div>
                      <div className='profile__holiday-text'>
                        <p className='profile__destination'>
                          {holiday.city.city}, {holiday.city.country}
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
