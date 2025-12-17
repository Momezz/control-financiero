import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

const selectItems = (state: RootState) => state.totalFinances.items;

export const selectTotalIncome = createSelector([selectItems], (items) => items
  .filter(item => item.type === 'income')
  .reduce((sum, item) => sum + item.amount, 0)
);

export const selectTotalExpense = createSelector([selectItems], (items) => items
  .filter(item => item.type === 'expense')
  .reduce((sum, item) => sum + item.amount, 0)
);

export const selectBalance = createSelector(
  [selectTotalIncome, selectTotalExpense],
  (income, expenses) => income - expenses); 
  