import { createSlice } from '@reduxjs/toolkit';

import { createAdvertisement } from './AdvertisementStore.action';
import { ADVERTISEMENT_SLICE_NAME } from './AdvertisementStore.const';
import { AdvertisementState } from './AdvertisementStore.types';

const initialState: AdvertisementState = {
  advertisements: [],
  isLoading: false,
  error: undefined,
};

export const AdvertisementSlice = createSlice({
  name: ADVERTISEMENT_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAdvertisement.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(createAdvertisement.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.advertisements = [payload, ...state.advertisements];
        state.error = undefined;
      })
      .addCase(createAdvertisement.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default AdvertisementSlice.reducer;
