import React, { useState, useEffect } from 'react';
import { getAllCities } from '../api/cities_api';
import { Link } from 'react-router-dom';

const CreateHoliday = () => {
  const [cities, setCities] = useState(null);

  useEffect(() => {
    const getCityData = async () => {
      const allCities = await getAllCities();
      const sortedCities = allCities.sort((a, b) => a.city.localeCompare(b.city));
      setCities(sortedCities);
    };
    getCityData();
  }, []);

  console.log('cities', cities);

  return (
    <section className='createHoliday'>
      <div className='createHoliday__container'>
        <h1 className='createHoliday__title'>Create Holiday Page</h1>
        <div className='createHoliday__form-wrapper'>
          <form className='card createHoliday__form'>
            <label className='createHoliday__form-label'>Destination*</label>
            <select
              name='cities'
              className='input createHoliday__form-field createHoliday__form-field--destination'
            >
              {/* <option value='Bangkok' disabled selected>
                Choose City
              </option>
              <option value='Bangkok'>Bangkok</option>
              <option value='Mallorca'>Mallorca</option> */}
              {!cities ? (
                <option value='Choose-city' disabled defaultValue>
                  Loading cities...
                </option>
              ) : (
                // <option value='Choose-city' disabled defaultValue>
                //   Loading cities...
                // </option>
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
            <label className='createHoliday__form-label' htmlFor='new-post-service'>
              Dates
            </label>
            <input
              className='input createHoliday__form-field createHoliday__form-field--dates'
              type='text'
              name='service'
              placeholder='mm/yy'
            />
            <label className='createHoliday__form-label' htmlFor='new-post-urgency'>
              Duration*
            </label>
            <input
              className='input createHoliday__form-field createHoliday__form-field--destination'
              type='text'
              name='urgency'
              placeholder='3 days, 1 week, 10 days, 30 days etc...'
            />
            <label className='createHoliday__form-label' htmlFor='new-post-urgency'>
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
              <label className='createHoliday__form-label' htmlFor='new-post-urgency'>
                Weather
              </label>
              <div>⭐️⭐️⭐️⭐️⭐️</div>
            </div>
            <div className='createHoliday__rating createHoliday__rating--food'>
              <label className='createHoliday__form-label' htmlFor='new-post-urgency'>
                Food
              </label>
              <div>⭐️⭐️⭐️⭐️⭐️</div>
            </div>
            <div className='createHoliday__rating createHoliday__rating--food'>
              <label className='createHoliday__form-label' htmlFor='new-post-urgency'>
                Culture
              </label>
              <div>⭐️⭐️⭐️⭐️⭐️</div>
            </div>
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
