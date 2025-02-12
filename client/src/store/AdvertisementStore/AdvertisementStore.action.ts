import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axiosInstance } from '../../api/axiosInstance';
import { CREATE_ADVERTISEMENT } from '../../constants/apiURL';
import { CREATE_ADVERTISEMENT_ACTION_NAME } from './AdvertisementStore.const';
import {
  AdvertisementItem,
  AdvertisementItemResponse,
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
