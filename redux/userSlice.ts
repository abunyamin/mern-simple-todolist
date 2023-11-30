import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { currentUserType } from '../utils/type';
import axios from 'axios';

interface initialStateType {
  currentUser: currentUserType[] | null;
  loading: boolean;
  error: boolean;
  accessToken: string;
}

const initialState: initialStateType = {
  currentUser: null,
  loading: false,
  error: false,
  accessToken: '',
};

export const protectedHandler = createAsyncThunk('user/protected', async (accessToken) => {
  try {
    const response = await axios.get(`http://localhost:8800/api/auth/protected`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<currentUserType[]>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(protectedHandler.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload;
    });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setError } = userSlice.actions;

export default userSlice.reducer;
