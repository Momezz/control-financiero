import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Item {
  _id: string;
  transactionType: string;
  category: string;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

interface ItemState {
  financialitems: Item[];
  isAuthenticated: boolean;
  selectedItem: Item | null;
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  financialitems: [],
  isAuthenticated: false,
  selectedItem: null,
  loading: false,
  error: null,
};

export interface FinancialItemFormData {
  transactionType: string;
  category: string;
  description: string;
  amount: number | string;
}

export const getFinancialItemById = createAsyncThunk<Item, string>('financial-item/getFinancialItemById', async (id) => {
  const resp = await fetch(`${BASE_URL}/api/financial-item/${id}`);
  const data = await resp.json();
  return data;
});

export const getFinancialItems = createAsyncThunk<Item[]>('financial-item/getFinancialItems', async () => {
  const response = await fetch(`${BASE_URL}/api/financial-item`);
  const data = await response.json();
  return data.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
});

export const createFinancialItem = createAsyncThunk<Item, FinancialItemFormData>('financial-item/createFinancialItem', async (financialitem) => {
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

export const updateFinancialItem = createAsyncThunk<
  Item,
  { id: string; financialitem: Partial<FinancialItemFormData> }
>(
  'financial-item/updateFinancialItem',
  async ({ id, financialitem }, { rejectWithValue }) => {
    const response = await fetch(
      `${BASE_URL}/api/financial-item/${id}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(financialitem),
      }
    );
    if (response.status === 401) {
      return rejectWithValue('UNAUTHENTICATED');
    }
    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error);
    }
    return response.json();
  }
);

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
      state.selectedItem = action.payload;
    });
    builder.addCase(createFinancialItem.fulfilled, (state, action) => {
      state.financialitems.push(action.payload);
    });
    builder.addCase(deleteFinancialItem.fulfilled, (state, action) => {
      state.financialitems = state.financialitems.filter(item => item._id !== action.payload);
    });
    builder.addCase(updateFinancialItem.fulfilled, (state, action) => {
      const index = state.financialitems.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.financialitems[index] = action.payload;
      }
    });
    builder.addCase(updateFinancialItem.rejected, (state, action) => {
      if (action.payload === 'UNAUTHENTICATED') {
        state.isAuthenticated = false;
      }
    });
  },
});

export default financialItemSlice.reducer;
export const { captureData } = financialItemSlice.actions;
