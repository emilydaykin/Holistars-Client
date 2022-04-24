import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import citiesReducer from '../features/cities/citiesSlice';
import loginReducer from '../features/login/loginSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    cities: citiesReducer,
    userInfo: loginReducer,
  },
});
