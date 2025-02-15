import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { axiosInstance } from '../../api/axiosInstance';
import {
  CREATE_ADVERTISEMENT,
  GET_ADVERTISEMENT,
  GET_ADVERTISEMENTS,
} from '../../constants/apiURL';
import { AdvertisementType } from '../../shared/types';
import {
  CREATE_ADVERTISEMENT_ACTION_NAME,
  DELETE_ADVERTISEMENT_ACTION_NAME,
  EDIT_ADVERTISEMENT_ACTION_NAME,
  GET_ADVERTISEMENT_ACTION_NAME,
  GET_ADVERTISEMENTS_ACTION_NAME,
} from './AdvertisementStore.const';
import {
  AdvertisementItem,
  AdvertisementItemResponse,
  AdvertisementsResponse,
  QueryParams,
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
  QueryParams,
  {
    rejectValue: string;
  }
>(
  GET_ADVERTISEMENTS_ACTION_NAME,
  async (
    {
      page,
      limit,
      name,
      type,
      propertyType,
      areaFrom,
      areaTo,
      rooms,
      priceFrom,
      priceTo,
      brand,
      model,
      yearFrom,
      yearTo,
      serviceType,
      experienceFrom,
      costFrom,
      costTo,
    },
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (name) params.append('name', name);
      if (type) params.append('type', type);

      if (type === AdvertisementType.RealEstate) {
        if (propertyType) params.append('propertyType', propertyType);
        if (areaFrom) params.append('areaFrom', areaFrom.toString());
        if (areaTo) params.append('areaTo', areaTo.toString());
        if (rooms) params.append('rooms', rooms.toString());
        if (priceFrom) params.append('priceFrom', priceFrom.toString());
        if (priceTo) params.append('priceTo', priceTo.toString());
      }

      if (type === AdvertisementType.Auto) {
        if (brand) params.append('brand', brand);
        if (model) params.append('model', model);
        if (yearFrom) params.append('yearFrom', yearFrom.toString());
        if (yearTo) params.append('yearTo', yearTo.toString());
      }

      if (type === AdvertisementType.Services) {
        if (serviceType) params.append('serviceType', serviceType);
        if (experienceFrom)
          params.append('experienceFrom', experienceFrom.toString());
        if (costFrom) params.append('costFrom', costFrom.toString());
        if (costTo) params.append('costTo', costTo.toString());
      }

      const res = await axiosInstance.get<AdvertisementsResponse>(
        `${GET_ADVERTISEMENTS}?${params}`,
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

export const deleteAdvertisement = createAsyncThunk<
  { id: string },
  { id: string },
  {
    rejectValue: string;
  }
>(DELETE_ADVERTISEMENT_ACTION_NAME, async ({ id }, { rejectWithValue }) => {
  try {
    await axiosInstance.delete<AdvertisementItemResponse>(
      GET_ADVERTISEMENT(id),
    );

    return { id };
  } catch (e) {
    console.log(e);
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data?.error || 'Произошла ошибка');
    }

    return rejectWithValue('Произошла ошибка');
  }
});
