import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AdvertisementType } from '../../shared/types';
import {
  createAdvertisement,
  deleteAdvertisement,
  editAdvertisement,
  getAdvertisement,
  getAdvertisements,
} from './AdvertisementStore.action';
import { ADVERTISEMENT_SLICE_NAME } from './AdvertisementStore.const';
import {
  AdvertisementItemResponse,
  AdvertisementState,
} from './AdvertisementStore.types';

const initialState: AdvertisementState = {
  advertisements: [],
  advertisement: {
    id: -1,
    name: '',
    description: '',
    location: '',
    type: AdvertisementType.RealEstate,
    propertyType: '',
    area: 0,
    rooms: 0,
    price: 0,
  },
  currentPage: 1,
  totalPages: 1,
  isEditing: false,
  advertisementEdit: undefined,
  isLoading: false,
  error: undefined,
};

export const AdvertisementSlice = createSlice({
  name: ADVERTISEMENT_SLICE_NAME,
  initialState,
  reducers: {
    setEdit: (
      state,
      {
        payload,
      }: PayloadAction<{
        isEditing: boolean;
        advertisementEdit?: AdvertisementItemResponse | undefined;
      }>,
    ) => {
      state.isEditing = payload.isEditing;
      state.advertisementEdit = payload.advertisementEdit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdvertisement.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(createAdvertisement.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (state.advertisements.length < 5) {
          state.advertisements = [...state.advertisements, payload];
        } else {
          state.totalPages++;
        }
        state.error = undefined;
      })
      .addCase(createAdvertisement.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getAdvertisements.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAdvertisements.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.advertisements = payload.advertisements;
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
        state.error = undefined;
      })
      .addCase(getAdvertisements.rejected, (state, { payload }) => {
        state.currentPage = 1;
        state.totalPages = 1;
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getAdvertisement.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAdvertisement.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.advertisement = payload;
        state.error = undefined;
      })
      .addCase(getAdvertisement.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(editAdvertisement.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(editAdvertisement.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = undefined;
        state.advertisements = state.advertisements.map((advertisement) =>
          advertisement.id === payload.id ? payload : advertisement,
        );
      })
      .addCase(editAdvertisement.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deleteAdvertisement.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteAdvertisement.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = undefined;
        state.advertisements = state.advertisements.filter(
          (advertisement) => advertisement.id !== Number(payload.id),
        );
      })
      .addCase(deleteAdvertisement.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { setEdit } = AdvertisementSlice.actions;

export default AdvertisementSlice.reducer;
