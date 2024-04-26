import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  financialitems: [],
};

export const getFinancialItemById = createAsyncThunk('financialitems/getFinancialItemById', async (id) => {
  const resp = await fetch(`${BASE_URL}/api/financialitems/${id}`);
  const data = await resp.json();
  return data;
});

export const getFinancialItems = createAsyncThunk('financialitems/getFinancialItems', async () => {
  const response = await fetch(`${BASE_URL}/api/financialitems`);
  const data = await response.json();
  return data;
});

export const createFinancialItem = createAsyncThunk('financialitems/createFinancialItem', async (financialitem) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(financialitem),
  };

  const response = await fetch(`${BASE_URL}/api/financialitems`, options);
  const data = await response.json();
  return data;
});

export const deleteFinancialItem = createAsyncThunk('financialitems/deleteFinancialItem', async (id) => {
  const options = {
    method: 'DELETE',
  };

  const response = await fetch(`${BASE_URL}/api/financialitems/${id}`, options);
  const data = await response.json();
  return data;
});

export const updateFinancialItem = createAsyncThunk('financialitems/updateFinancialItem', async (financialitem, id) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(financialitem),
  };

  const response = await fetch(`${BASE_URL}/api/financialitems/${id}`, options);
  const data = await response.json();
  return data;
});

const financialItemSlice = createSlice({
  name: 'financialitems',
  initialState,
  reducers: {
    captureData: (state, action) => {
      state.financialitems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFinancialItems.fulfilled, (state, action) => {
      state.financialitems = action.payload;
    });
    builder.addCase(getFinancialItemById.fulfilled, (state, action) => {
      state.financialitems = action.payload;
    });
    builder.addCase(createFinancialItem.fulfilled, (state, action) => {
      state.financialitems = action.payload;
    });
    builder.addCase(deleteFinancialItem.fulfilled, (state, action) => {
      state.financialitems = action.payload;
    });
    builder.addCase(updateFinancialItem.fulfilled, (state, action) => {
      state.financialitems = action.payload;
    });
  },
});

export default financialItemSlice.reducer;
export const { captureData } = financialItemSlice.actions;
