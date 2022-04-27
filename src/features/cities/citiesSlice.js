import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const fetchCities = createAsyncThunk('cities/fetchCities', async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/cities/`);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const filterCities = createAsyncThunk('cities/filterCities', async (search_term) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/cities/${search_term}/`);
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
