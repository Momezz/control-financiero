import { configureStore } from '@reduxjs/toolkit';
import financialItemSlice from './features/financialItem/financialItemSlice';
import totalFinancesSlice from './features/totalFinances/totalFinancesSlice';
import userSlice from './features/userSlice';
import auth from './features/auth/authSlice'

const store = configureStore({
  reducer: {
    item: financialItemSlice,
    user: userSlice,
    totalFinances: totalFinancesSlice,
    auth: auth
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
