import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialState = {
  users: [],
  userDetail: {},
};

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await fetch(`${BASE_URL}/api/user`);
  const data = await response.json();
  return data;
});

export const getUserById = createAsyncThunk('users/getUserById', async (id) => {
  const response = await fetch(`${BASE_URL}/api/users/${id}`);
  const data = await response.json();
  return data;
});

export const createUser = createAsyncThunk<User, User>('users/createUser', async (user) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(`${BASE_URL}/api/users/`, options);
  const data = await response.json();
  return data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  const options = {
    method: 'DELETE',
  };
  await fetch(`${BASE_URL}/api/users/${id}`, options);
  return id;
});

export const updateUser = createAsyncThunk<User, User>('users/updateUser', async (user) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(`${BASE_URL}/api/users/${user._id}`, options);
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.userDetail = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const { users } = current(state);
      state.users = users.filter((r) => r._id !== action.payload);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { users } = current(state);
      const usersUpdated = Array.isArray(users)
        ? users.map((r) => (r._id === action.payload._id ? { ...r, ...action.payload } : r))
        : users;
      state.users = usersUpdated;
    });
  },
});

export default usersSlice.reducer;
