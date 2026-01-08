import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  user: any | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (
      state,
      action: PayloadAction<string>
    ) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (
      state,
      action: PayloadAction<any>
    ) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const {
  setAccessToken,
  setUser,
  clearAuth
} = authSlice.actions;

export default authSlice.reducer;
