"use client";

import { formatNumber } from '@/utils/numberFormat';
import { formatDateTimeUTC } from '@/utils/date';
import styles from './see-details.module.css';

interface Props {
  onClose: () => void;
  item: {
    _id: string;
    description: string;
    amount: number;
    transactionType: string;
    createdAt: string;
  } | null;
}

const SeeDetails = ({ onClose, item }: Props) => {
  const transactionTypeStyle = item?.transactionType === 'income' ? styles.see_details__price_container_income : styles.see_details__price_container_expense;
  const transactionTypeText = item?.transactionType === 'income' ? 'Ingreso' : 'Gasto';
  if (!item) {
    return <div className={styles.see_details__container}>
      <p>Item not found </p>
      <button className={styles.see_details__btn} onClick={onClose}>Regresar</button></div>;
  }
  return (
    <div className={styles.see_details__container}>
      <h2 className={styles.see_details__title}>{item.description}</h2>
      <span className={styles.see_details__price}>$ {formatNumber(item.amount)}</span>
      <div className={transactionTypeStyle}>
        <p>{transactionTypeText}</p>
      </div>
      <p className={styles.see_details__date}>{formatDateTimeUTC(item.createdAt)}</p>
      <button className={styles.see_details__btn} onClick={onClose}>Regresar</button>
    </div>
  )
}

export default SeeDetails;
