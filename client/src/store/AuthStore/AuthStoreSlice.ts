import { createSlice } from '@reduxjs/toolkit';

import { login, register } from './AuthStore.action';
import { AUTH_SLICE_NAME } from './AuthStore.const';
import { AuthStoreState } from './AuthStore.types';
import { loadTokenFromLocalStorage } from './AuthStore.utils';

const initialState: AuthStoreState = {
  token: loadTokenFromLocalStorage(),
  isLoggedIn: !!loadTokenFromLocalStorage(),
  isLoading: false,
  error: undefined,
};

export const AuthSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.setItem('token', '');
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
        localStorage.setItem('token', payload.token);
        state.isLoggedIn = true;
        state.error = undefined;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        localStorage.setItem('token', '');
        state.isLoggedIn = false;
        state.error = payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
        localStorage.setItem('token', payload.token);
        state.isLoggedIn = true;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        localStorage.setItem('token', '');
        state.isLoggedIn = false;
        state.error = payload;
      });
  },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
