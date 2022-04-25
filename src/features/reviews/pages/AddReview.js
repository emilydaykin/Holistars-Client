import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddReview = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem('userInfo')).token;
  const [newReview, setNewReview] = useState({
    text: '',
    city: Number(cityId),
    rating_food: 0,
    rating_weather: 0,
    rating_culture: 0,
  });

  const addRating = () => {
    return Array(5)
      .fill(true)
      .map((_, index) => (
        <option key={index} value={index + 1}>
          {index + 1}
        </option>
      ));
  };

  const handleChange = e => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/review/create/', newReview, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => navigate(-1))
      .catch(console.error);
  };

  console.log(newReview);

  return (
    <section className='section-main'>
      <h1>Add a Review</h1>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-control'>
          <label htmlFor='text'>Your thoughs:</label>
          <textarea
            className='input textarea'
            name='text'
            id='text'
            onChange={handleChange}
          ></textarea>
        </div>

        <div className='form-control'>
          <label htmlFor='review-text'>Your thoughs:</label>
          <select name='rating_food' id='rating_food' onChange={handleChange}>
            {addRating()}
          </select>
          <select
            name='rating_weather'
            id='rating_weather'
            onChange={handleChange}
          >
            {addRating()}
          </select>
          <select
            name='rating_culture'
            id='rating_culture'
            onChange={handleChange}
          >
            {addRating()}
          </select>
        </div>
        <button type='submit' className='button'>
          Add Review
        </button>
      </form>
    </section>
  );
};

export default AddReview;
