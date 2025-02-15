import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axiosInstance } from '../../api/axiosInstance';
import { LOGIN, REGISTER } from '../../constants/apiURL';
import { LOGIN_ACTION_NAME, REGISTER_ACTION_NAME } from './AuthStore.const';
import { AuthCredentials } from './AuthStore.types';

export const register = createAsyncThunk<
  { token: string },
  AuthCredentials,
  {
    rejectValue: string;
  }
>(REGISTER_ACTION_NAME, async (authCredentials, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<{ token: string }>(REGISTER, {
      ...authCredentials,
    });

    return res.data;
  } catch (e) {
    console.log(e);
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data?.error || 'Произошла ошибка');
    }

    return rejectWithValue('Произошла ошибка');
  }
});

export const login = createAsyncThunk<
  { token: string },
  AuthCredentials,
  {
    rejectValue: string;
  }
>(LOGIN_ACTION_NAME, async (authCredentials, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<{ token: string }>(LOGIN, {
      ...authCredentials,
    });

    return res.data;
  } catch (e) {
    console.log(e);
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data?.error || 'Произошла ошибка');
    }

    return rejectWithValue('Произошла ошибка');
  }
});
