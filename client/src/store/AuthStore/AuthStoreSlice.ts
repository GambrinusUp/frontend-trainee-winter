import { createSlice } from '@reduxjs/toolkit';

import { login, register } from './AuthStore.action';
import { AUTH_SLICE_NAME } from './AuthStore.const';
import { AuthStoreState } from './AuthStore.types';

const initialState: AuthStoreState = {
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: undefined,
};

export const AuthSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
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
        state.isLoggedIn = true;
        state.error = undefined;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
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
        state.isLoggedIn = true;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = payload;
      });
  },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
