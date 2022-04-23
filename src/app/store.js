import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import loginReducer from '../features/login/loginSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    userInfo: loginReducer,
  },
});
