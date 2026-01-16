"use client";

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import FinancialItem from '../FinancialItem/FinancialItem';
import { useEffect } from 'react';
import { selectBalance, selectTotalExpense, selectTotalIncome } from '@/redux/features/financialItem/selectors';
import { getFinancialItems } from '@/redux/features/financialItem/financialItemSlice';
import { formatNumber } from '@/utils/numberFormat';
import styles from '@/components/Banner/banner.module.css';

const Banner = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFinancialItems());
  }, [dispatch]);
  const balance = useSelector(selectBalance);
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpense = useSelector(selectTotalExpense);

  return (
    <article className={styles.banner__container}>
      <h2 className={styles.banner__title}>Presupuesto disponible</h2>
      <p className={styles.banner__title}>{formatNumber(balance)}</p>
      <div className={styles.banner__item_container}>
        <FinancialItem title="Ingresos" value={totalIncome} />
        <FinancialItem title="Gastos" value={totalExpense} />
      </div>
      <div className={styles.banner__layer} ></div>
    </article>
  )
}

export default Banner;
