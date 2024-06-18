import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Item {
  id?: string;
  transactionType: string;
  category: string;
  description: string;
  amount: number;
}

interface ItemState {
  financialitems: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  financialitems: [],
  loading: false,
  error: null,
};

export const getFinancialItemById = createAsyncThunk<Item, string>('financial-item/getFinancialItemById', async (id) => {
  const resp = await fetch(`${BASE_URL}/api/financial-item/${id}`);
  const data = await resp.json();
  return data;
});

export const getFinancialItems = createAsyncThunk<Item[]>('financial-item/getFinancialItems', async () => {
  const response = await fetch(`${BASE_URL}/api/financial-item`);
  const data = await response.json();
  return data;
});

export const createFinancialItem = createAsyncThunk<Item, Item>('financial-item/createFinancialItem', async (financialitem) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(financialitem),
  };
  const response = await fetch(`${BASE_URL}/api/financial-item`, options);
  const data = await response.json();
  return data;
});

export const deleteFinancialItem = createAsyncThunk<string, string>('financial-item/deleteFinancialItem', async (id) => {
  const options = {
    method: 'DELETE',
  };

  await fetch(`${BASE_URL}/api/financial-item/${id}`, options);
  return id;
});

export const updateFinancialItem = createAsyncThunk<Item, { id: string; financialitem: Partial<Item> }>('financial-item/updateFinancialItem', async ({ id, financialitem }) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(financialitem),
  };

  const response = await fetch(`${BASE_URL}/api/financial-item/${id}`, options);
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
      state.financialitems = [action.payload];
    });
    builder.addCase(createFinancialItem.fulfilled, (state, action) => {
      state.financialitems.push(action.payload);
    });
    builder.addCase(deleteFinancialItem.fulfilled, (state, action) => {
      state.financialitems = state.financialitems.filter(item => item.id !== action.payload);
    });
    builder.addCase(updateFinancialItem.fulfilled, (state, action) => {
      const index = state.financialitems.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.financialitems[index] = action.payload;
      }
    });
  },
});

export default financialItemSlice.reducer;
export const { captureData } = financialItemSlice.actions;
