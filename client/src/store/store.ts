import { configureStore } from '@reduxjs/toolkit';

import advertisementSlice from './AdvertisementStore/AdvertisementStoreSlice';

const store = configureStore({
  reducer: {
    advertisementStore: advertisementSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
