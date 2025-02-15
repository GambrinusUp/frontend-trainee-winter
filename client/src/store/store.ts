import { configureStore } from '@reduxjs/toolkit';

import advertisementSlice from './AdvertisementStore/AdvertisementStoreSlice';
import AuthSlice from './AuthStore/AuthStoreSlice';

const store = configureStore({
  reducer: {
    advertisementStore: advertisementSlice,
    authStore: AuthSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
