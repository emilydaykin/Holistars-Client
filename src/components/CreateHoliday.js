import React, { useState, useEffect } from 'react';
import { getAllCities } from '../api/cities_api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { addHoliday } from '../api/holidays_api';

const CreateHoliday = ({ addHolidayClicked, setAddHolidayClicked }) => {
  const [cities, setCities] = useState(null);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(sessionStorage.getItem('userInfo'));
  }, [sessionStorage]);

  const [formData, setFormData] = useState({
    user: 0,
    city: 27, // default Athens, Greece (bug: requires selecting twice so fixing it here)
    date: '',
    duration: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getCityData = async () => {
      const allCities = await getAllCities();
      const sortedCities = allCities.sort((a, b) => a.city.localeCompare(b.city));
      setCities(sortedCities);
    };
    getCityData();
  }, []);

  console.log('cities', cities);

  const goBack = () => {
    console.log('GO BACK clicked');
    setAddHolidayClicked(false);
    navigate(`/profile/${JSON.parse(userInfo)?.id}`);
  };

  const handleChange = (e) => {
    console.log('e.target.name', e.target.name);
    console.log('e.target.value', e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log('formData', formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit clicked!');
    if (userInfo) {
      // USER INFO NEEDS TO BE PARSED!
      console.log('userInfo INSIDE', userInfo);
      const holidayInfo = { ...formData, user: JSON.parse(userInfo).id };
      console.log('holidayInfo', holidayInfo);
      addHoliday(holidayInfo);
      setAddHolidayClicked(false);
      navigate(`/profile/${JSON.parse(userInfo)?.id}`);
      window.location.reload(true);
    }
  };

  return (
    <section className={addHolidayClicked ? 'createHoliday' : 'hide'}>
      <div className='createHoliday__container'>
        <div className='createHoliday__form-wrapper'>
          <form className='createHoliday__form'>
            <h1 className='createHoliday__title'>Add Your Holiday</h1>
            <FontAwesomeIcon className='createHoliday__go-back' icon={faXmark} onClick={goBack} />
            <label className='createHoliday__form-label' htmlFor='destination'>
              Destination*
            </label>
            <select
              name='city'
              className='input createHoliday__form-field createHoliday__form-field--destination'
              value={formData.city}
              onChange={handleChange}
            >
              {!cities ? (
                <option value='Choose-city' disabled defaultValue>
                  Loading cities...
                </option>
              ) : (
                cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.city}, {city.country}
                  </option>
                ))
              )}
            </select>
            <Link
              className='button createHoliday__button createHoliday__button--add-destination'
              to={'/add-new-city'}
            >
              Can't find your holiday destination? Scrape it here!
            </Link>
            <label className='createHoliday__form-label' htmlFor='dates'>
              Dates
            </label>
            <input
              className='input createHoliday__form-field createHoliday__form-field--dates'
              type='text'
              name='date'
              placeholder='mm/yyyy'
              value={formData.date}
              onChange={handleChange}
            />
            <label className='createHoliday__form-label' htmlFor='duration'>
              Duration*
            </label>
            <input
              className='input createHoliday__form-field createHoliday__form-field--duration'
              type='text'
              name='duration'
              placeholder='3 days, 1 week, 10 days, 30 days etc...'
              value={formData.duration}
              onChange={handleChange}
            />
            <button
              className='button createHoliday__button createHoliday__button--submit'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateHoliday;
