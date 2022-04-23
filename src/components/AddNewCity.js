import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { scrapeSearch, scrapeCities } from '../api/scrape_api';
import { addCity } from '../api/cities_api';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AddNewCity = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState(null);
  const [searchInput, setSearchInput] = useState({
    city: '',
    country: ''
  });
  const [searchTerms, setSearchTerms] = useState({
    city: '',
    country: ''
  });
  const [searchClicked, setSearchClicked] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [cityToAdd, setCityToAdd] = useState({});
  const [resultClicked, setResultClicked] = useState(false);
  const [addToDbSuccess, setAddToDbSuccess] = useState(null);

  const handleSearchChange = (e) => {
    setSearchInput({ ...searchInput, [e.target.name]: e.target.value });
    setSearchClicked(false);
    setSearchTerms({ ...searchTerms, [e.target.name]: '' });
    setSearchResults(null);
  };

  const scrapeUserSearchThenCity = async (updatedSearchTerms) => {
    /**
     * This function performs two scrapes:
     *    1) first scrapes the user _search_,
     *    2) then scrapes each of the urls of the search
     *       results to display them for the user to select
     */
    setScraping(true);
    const urls = await scrapeSearch(updatedSearchTerms);
    const cities = await scrapeCities({ urls: urls });
    setSearchResults(cities);
    setScraping(false);
  };

  const handleSearchButton = (e) => {
    e.preventDefault();
    setSearchClicked(true);
    const updatedSearchTerms = {
      ...searchTerms,
      city: searchInput.city.toLowerCase(),
      country: searchInput.country.toLowerCase()
    };
    setSearchTerms(updatedSearchTerms);
    setSearchInput({ ...searchTerms, [e.target.name]: '' });
    scrapeUserSearchThenCity(updatedSearchTerms);
  };

  const replaceInvalidImage = async (cityObj) => {
    try {
      await axios.get(cityObj.image).then(({ resp }) => console.log(resp));
    } catch (err) {
      cityObj.image =
        err.response?.status === 403
          ? 'https://images.unsplash.com/photo-1619460941702-0c73da36fe59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1688&q=80'
          : cityObj.image;
    }
  };

  const addCityToDb = async (cityObject) => {
    console.log('CITY SELECTED!');
    setResultClicked(true);
    await replaceInvalidImage(cityObject);
    console.log('cityObject', cityObject);
    setCityToAdd(cityObject);
    try {
      await addCity(cityObject);
      setAddToDbSuccess(true);
    } catch (err) {
      setAddToDbSuccess(false);
    }
  };

  return (
    <section className='addNewCity'>
      <h1 className='addNewCity__title'>Search For Your Holiday Destination</h1>
      <div className='addNewCity__form-wrapper'>
        <div className={resultClicked ? 'addNewCity__city-clicked-popup' : 'hide'}>
          <p>
            {addToDbSuccess
              ? `✅ Successfully added ${cityToAdd.city} to database!`
              : `⚠️ ${cityToAdd.city} already exists in the database`}
          </p>
          <Link
            className='button addNewCity__city-clicked-popup--button'
            to={{ pathname: '/profile/3', state: { fromAddCity: true } }}
          >
            Return to add holiday
          </Link>
        </div>
        <form className='card addNewCity__form'>
          Type in the name of your holiday destination, and wait for the search results to appear!
          <div className='addNewCity__search-controls'>
            <input
              className='input addNewCity__search-bar'
              type='text'
              placeholder='City*'
              name='city'
              onChange={handleSearchChange}
              value={searchInput.city}
            />
            <input
              className='input addNewCity__search-bar'
              type='text'
              placeholder='Country'
              name='country'
              onChange={handleSearchChange}
              value={searchInput.country}
            />
            <button className='button addNewCity__search-button' onClick={handleSearchButton}>
              🔎
            </button>
          </div>
          <div className={!searchTerms.city ? 'hide' : 'addNewCity__search-results-wrapper'}>
            <h2 className='addNewCity__results-heading'>
              Destinations matching your search
              {searchClicked ? ` "${searchTerms.city}", "${searchTerms.country}"` : ''}
              {!searchResults
                ? ''
                : ` (${searchResults.length} ${searchResults.length === 1 ? 'result' : 'results'})`}
              :
            </h2>
            <div className='addNewCity__search-results'>
              {scraping ? (
                <p className='addNewCity__scraping-results'>Scraping results...</p>
              ) : !searchResults ? (
                <></>
              ) : searchResults && searchResults.length === 0 ? (
                <div className='addNewCity__blank-search-results'>
                  <p>
                    Oh no! There were no results matching your search "{searchTerms.city}, "
                    {searchTerms.country}". Try again or add your holiday destination manually.
                  </p>
                  <Link className='button addNewCity__button-manual-add' to={'#'}>
                    Add Holiday Destination Manually
                  </Link>
                </div>
              ) : (
                <>
                  {searchResults.map((city, idx) => (
                    <div
                      className='card addNewCity__city-card'
                      key={idx}
                      onClick={() => addCityToDb(city)}
                    >
                      <div
                        className='addNewCity__city-image'
                        style={{
                          backgroundImage: `url(${city.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: '50% 35%'
                        }}
                      ></div>
                      <div className='addNewCity__city-text'>
                        <p className='addNewCity__city-state'>
                          <span className='addNewCity__city-name'>{city.city}</span>&ensp;
                          {city.state ? (
                            <span className='addNewCity__state-name'>({city.state})</span>
                          ) : (
                            <span></span>
                          )}
                        </p>
                        <p className='addNewCity__country-continent'>
                          <span>{city.country}</span>
                          ,&ensp;
                          <span>{city.continent}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className='addNewCity__blank-search-results'>
                    <p className='addNewCity__imperfect-search-results'>
                      Still no perfect matches for your holiday destination? Search again or add it
                      manually.
                    </p>
                    <Link className='button addNewCity__button-manual-add' to={'#'}>
                      Add Holiday Destination Manually
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewCity;
