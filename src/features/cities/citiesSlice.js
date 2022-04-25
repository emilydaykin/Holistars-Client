import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAllCities } from '../../api/cities_api';

const initialState = [];

export const fetchCities = createAsyncThunk('cities/fetchCities', async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/cities/');
    // console.log('RESPONSE', response.data);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const filterCities = createAsyncThunk('cities/filterCities', async (search_term) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/cities/${search_term}/`);
    // console.log('RESPONSE', response.data);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCities.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(filterCities.fulfilled, (state, action) => {
        state.cities.push(action.payload);
      });
  }
});

export const selectAllCities = (state) => state.cities;
export const selectCityById = (state, id) => state.cities.find((city) => city.id === id);

export default citiesSlice.reducer;
