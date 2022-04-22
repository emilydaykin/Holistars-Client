import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/users_api';
import axios from 'axios';

const USERS_URL = 'http://localhost:8000/api/authentication';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await api.get('/authentication');
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const registerUser = createAsyncThunk('users/registerUser', async (newUser) => {
  try {
    const response = await axios.post(`${USERS_URL}/register/`, newUser);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  }
});

export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, id) => state.users.find((user) => user.id === id);

export const { userRegistered } = usersSlice.actions;

export default usersSlice.reducer;
