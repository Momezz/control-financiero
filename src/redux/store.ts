import { configureStore } from '@reduxjs/toolkit';
import financialItemSlice from './features/financialItemSlice';

const store = configureStore({
  reducer: {
    item: financialItemSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
