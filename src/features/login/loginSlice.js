import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/users_api';
import axios from 'axios';

const initialState = {
  userInfo: sessionStorage.getItem('userInfo') ? sessionStorage.getItem('userInfo') : {}
};

export const loginUser = createAsyncThunk('login/loginUser', async (user) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/authentication/login/`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
    sessionStorage.setItem('userInfo', JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const loginSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    logout(state) {
      sessionStorage.removeItem('userInfo');
      state.userInfo = {};
    }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
    }
  }
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
