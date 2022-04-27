import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { selectAllCities } from '../features/cities/citiesSlice';
import { useSelector } from 'react-redux';
import { selectUserById } from '../features/users/usersSlice';
import CreateHoliday from './CreateHoliday';

const Profile = () => {
  const { id } = useParams();

  const allCities = useSelector(selectAllCities);
  const user = useSelector((state) => selectUserById(state, Number(id)));
  const [orderedUserHolidays, setOrderedUserHolidays] = useState([]);
  const [addHolidayClicked, setAddHolidayClicked] = useState(false);

  const loggedInUser = useSelector((state) => state.userInfo.userInfo);

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
      const orderedHolidays = user?.holidays
        .slice()
        .sort((a, b) => new Date(prettifyDate(b.date)) - new Date(prettifyDate(a.date)));
      setOrderedUserHolidays(orderedHolidays);
    };
    orderHolidaysByDate();
  }, [id, user, user?.holidays]);

  const findCity = (cityId) => {
    return allCities.find((city) => city.id === cityId);
  };

  const handleAddHoliday = (e) => {
    setAddHolidayClicked(true);
  };

  return (
    <section className='profile'>
      {addHolidayClicked ? (
        <CreateHoliday
          addHolidayClicked={addHolidayClicked}
          setAddHolidayClicked={setAddHolidayClicked}
        />
      ) : (
        <></>
      )}
      {!user || !orderedUserHolidays ? (
        <p></p>
      ) : (
        <div className='profile__container'>
          <div className='profile__info'>
            <div
              className='profile__profile-picture'
              style={{ backgroundImage: `url(${user.image})` }}
            ></div>
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
            {user?.id === loggedInUser?.id && (
              <button className='button profile__add-holiday' onClick={handleAddHoliday}>
                Add New Holiday
              </button>
            )}
            <div className='profile_timeline-container'>
              <div
                className='profile__line'
                style={{ height: `${30 * orderedUserHolidays.length - 1}%` }}
              ></div>
              {orderedUserHolidays.map((holiday) => (
                <div key={holiday.id} className='profile__timeline-row'>
                  <div className='profile__circle'>
                    <div className='profile__circle profile__circle--inner'></div>
                  </div>
                  <Link
                    className='profile__timeline-entry-link'
                    to={`/destinations/${holiday.city}`}
                  >
                    <div className='profile__timeline-entry'>
                      <div
                        className='profile__holiday-image'
                        style={{ backgroundImage: `url(${findCity(holiday.city)?.image})` }}
                      ></div>
                      <div className='profile__holiday-text'>
                        <p className='profile__destination'>
                          {findCity(holiday.city)?.city}, {findCity(holiday.city)?.country}
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
