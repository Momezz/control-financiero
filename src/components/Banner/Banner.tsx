"use client";

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import {
  selectIncomeList,
  selectExpenseList,
} from '@/redux/features/financialItem/selectors';
import { getFinancialItems } from '@/redux/features/financialItem/financialItemSlice';
import FinancialItem from '../FinancialItem/FinancialItem';
import { formatNumber } from '@/utils/numberFormat';
import styles from '@/components/Banner/banner.module.css';
import type { Item } from '@/types/Item';
import type { PeriodFilter } from '@/types/PeriodFilter';

interface BannerProps {
  period: PeriodFilter;
}

const Banner = ({ period }: BannerProps) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFinancialItems());
  }, [dispatch]);

  const incomes = useSelector(selectIncomeList);
  const expenses = useSelector(selectExpenseList);

  const filterItems = (items: Item[]): Item[] => {
    if (period.type === 'all') return items;

    return items.filter((item) => {
      const date = new Date(item.createdAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const itemDate = `${year}-${month}-${day}`;

      return itemDate >= period.from && itemDate <= period.to;
    });
  };

  const filteredIncomes = filterItems(incomes);
  const filteredExpenses = filterItems(expenses);

  const totalIncome = filteredIncomes.reduce(
    (total, item) => total + item.amount,
    0
  );

  const totalExpense = filteredExpenses.reduce(
    (total, item) => total + item.amount,
    0
  );

  const balance = totalIncome - totalExpense;

  return (
    <article className={styles.banner__container}>
      <h2 className={styles.banner__title}>
        Presupuesto disponible
      </h2>
      <p className={styles.banner__title}>
        {formatNumber(balance)}
      </p>
      <div className={styles.banner__item_container}>
        <FinancialItem title="Ingresos" value={totalIncome} />
        <FinancialItem title="Gastos" value={totalExpense} />
      </div>
      <div className={styles.banner__layer}></div>
    </article>
  );
};

export default Banner;
