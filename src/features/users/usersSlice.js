import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_URL = 'http://localhost:8000/authentication';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(USERS_URL);
    console.log(response.data);
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
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = state => state.users;

export default usersSlice.reducer;
