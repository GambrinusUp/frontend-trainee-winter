import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axiosInstance } from '../../api/axiosInstance';
import {
  CREATE_ADVERTISEMENT,
  GET_ADVERTISEMENT,
  GET_ADVERTISEMENTS,
} from '../../constants/apiURL';
import {
  CREATE_ADVERTISEMENT_ACTION_NAME,
  EDIT_ADVERTISEMENT_ACTION_NAME,
  GET_ADVERTISEMENT_ACTION_NAME,
  GET_ADVERTISEMENTS_ACTION_NAME,
} from './AdvertisementStore.const';
import {
  AdvertisementItem,
  AdvertisementItemResponse,
  AdvertisementsResponse,
  PaginationParams,
} from './AdvertisementStore.types';

export const createAdvertisement = createAsyncThunk<
  AdvertisementItemResponse,
  AdvertisementItem,
  {
    rejectValue: string;
  }
>(
  CREATE_ADVERTISEMENT_ACTION_NAME,
  async (advertisementData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<AdvertisementItemResponse>(
        CREATE_ADVERTISEMENT,
        { ...advertisementData },
      );

      return res.data;
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data?.error || 'Произошла ошибка');
      }

      return rejectWithValue('Произошла ошибка');
    }
  },
);

export const getAdvertisements = createAsyncThunk<
  AdvertisementsResponse,
  PaginationParams,
  {
    rejectValue: string;
  }
>(
  GET_ADVERTISEMENTS_ACTION_NAME,
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<AdvertisementsResponse>(
        `${GET_ADVERTISEMENTS}?page=${page}&limit=${limit}`,
      );

      return res.data;
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data?.error || 'Произошла ошибка');
      }

      return rejectWithValue('Произошла ошибка');
    }
  },
);

export const getAdvertisement = createAsyncThunk<
  AdvertisementItemResponse,
  { id: string },
  {
    rejectValue: string;
  }
>(GET_ADVERTISEMENT_ACTION_NAME, async ({ id }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get<AdvertisementItemResponse>(
      GET_ADVERTISEMENT(id),
    );

    return res.data;
  } catch (e) {
    console.log(e);
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data?.error || 'Произошла ошибка');
    }

    return rejectWithValue('Произошла ошибка');
  }
});

export const editAdvertisement = createAsyncThunk<
  AdvertisementItemResponse,
  { id: string; advertisement: AdvertisementItem },
  {
    rejectValue: string;
  }
>(
  EDIT_ADVERTISEMENT_ACTION_NAME,
  async ({ id, advertisement }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put<AdvertisementItemResponse>(
        GET_ADVERTISEMENT(id),
        { ...advertisement },
      );

      return res.data;
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data?.error || 'Произошла ошибка');
      }

      return rejectWithValue('Произошла ошибка');
    }
  },
);
