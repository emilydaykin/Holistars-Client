import React, { useState, useEffect } from 'react';
import { getAllCities } from '../api/cities_api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CreateHoliday = ({ addHolidayClicked, setAddHolidayClicked }) => {
  const [cities, setCities] = useState(null);
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
    navigate('/profile/3');
  };

  return (
    <section className={addHolidayClicked ? 'createHoliday' : 'hide'}>
      <div className='createHoliday__container'>
        <div className='createHoliday__form-wrapper'>
          <form className='createHoliday__form'>
            <h1 className='createHoliday__title'>Add Your Holiday</h1>
            <FontAwesomeIcon className='createHoliday__go-back' icon={faXmark} onClick={goBack} />
            <label className='createHoliday__form-label'>Destination*</label>
            <select
              name='cities'
              className='input createHoliday__form-field createHoliday__form-field--destination'
            >
              {!cities ? (
                <option value='Choose-city' disabled defaultValue>
                  Loading cities...
                </option>
              ) : (
                cities.map((city) => (
                  <option key={city.id} value={city.city}>
                    {city.city}, {city.country}
                  </option>
                ))
              )}
            </select>
            <Link
              className='button createHoliday__button createHoliday__button--add-destination'
              to={'/add-new-city-TEMP'}
            >
              Can't find your holiday destination? Scrape it here!
            </Link>
            <label className='createHoliday__form-label' htmlFor='dates'>
              Dates
            </label>
            <input
              className='input createHoliday__form-field createHoliday__form-field--dates'
              type='text'
              name='dates'
              placeholder='mm/yyyy'
            />
            <label className='createHoliday__form-label' htmlFor='destination'>
              Duration*
            </label>
            <input
              className='input createHoliday__form-field createHoliday__form-field--destination'
              type='text'
              name='destination'
              placeholder='3 days, 1 week, 10 days, 30 days etc...'
            />
            {/* <label className='createHoliday__form-label' htmlFor='review'>
              Review
            </label>
            <textarea
              className='input createHoliday__form-field createHoliday__form-field--review'
              type='text'
              name='review'
              placeholder='Let others know how your holiday was!'
              rows='3'
            ></textarea>
            Rating
            <div className='createHoliday__rating createHoliday__rating--food'>
              <label className='createHoliday__form-label'>Weather</label>
              <div>⭐️⭐️⭐️⭐️⭐️</div>
            </div>
            <div className='createHoliday__rating createHoliday__rating--food'>
              <label className='createHoliday__form-label'>Food</label>
              <div>⭐️⭐️⭐️⭐️⭐️</div>
            </div>
            <div className='createHoliday__rating createHoliday__rating--food'>
              <label className='createHoliday__form-label'>Culture</label>
              <div>⭐️⭐️⭐️⭐️⭐️</div>
            </div> */}
            <button className='button createHoliday__button createHoliday__button--submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateHoliday;
