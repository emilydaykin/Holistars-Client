import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import citiesReducer from '../features/cities/citiesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    cities: citiesReducer
  }
});
