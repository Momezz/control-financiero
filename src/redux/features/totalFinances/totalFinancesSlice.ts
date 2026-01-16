import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TotalFinances {
  id: string;
  type: 'income' | 'expense';
  amount: number;
}

interface TotalFinancesState {
  items: TotalFinances[];
}

const initialState: TotalFinancesState = {
  items: [],
};

const totalFinancesSlice = createSlice({
  name: 'totalFinances',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TotalFinances>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
})

export const { addItem, removeItem } = totalFinancesSlice.actions;
export default totalFinancesSlice.reducer;
