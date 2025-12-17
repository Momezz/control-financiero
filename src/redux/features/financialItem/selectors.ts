import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

const selectFinancialItems = (state: RootState) =>
  state.item.financialitems;

export const selectTotalIncome = createSelector(
  [selectFinancialItems],
  items =>
    items
      .filter(data => data.transactionType === 'income')
      .reduce((sum, item) => sum + item.amount, 0)
);

export const selectTotalExpense = createSelector(
  [selectFinancialItems],
  items =>
    items
      .filter(item => item.transactionType === 'expense')
      .reduce((sum, item) => sum + item.amount, 0)
);

export const selectBalance = createSelector(
  [selectTotalIncome, selectTotalExpense],
  (income, expense) => income - expense
);

export const selectorSpedingRAte = createSelector(
  [selectTotalIncome, selectTotalExpense],
  (income, expense) => {
    if (income === 0) return 0;
    return (expense / income) * 100;
  }
)
