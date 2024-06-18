"use client";

import styles from '@/components/TransactionForm/transaction-form.module.css';
import { useDispatch } from 'react-redux';
import { MdDone } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import useForm from '@/redux/hooks';
import { createFinancialItem } from '@/redux/features/financialItemSlice';
import { getCategories } from '@/services/categories';
import CreateCategory from '../CreateCategory/CreateCategory';
import { AppDispatch } from '@/redux/store';

const TransactionForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [options, setOptions] = useState([]);
  const { form, handleChange } = useForm({});
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setOptions(categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategories();
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newItem = await dispatch(createFinancialItem({
        ...form,
        transactionType: form.transactionType,
        category: form.category,
        description: form.description,
        amount: parseFloat(form.amount) || 0
      }))
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <><CreateCategory /><form
      className={styles.transaction_form__container}
      onSubmit={handleSubmit}
    >
      <div className={styles.transaction_form__option}>
        <select onChange={handleChange} name="transactionType" required>
          <option className={styles.transaction_form__option} value="">
            Option{" "}
          </option>
          <option className={styles.transaction_form__button} value="income">
            Ingreso
          </option>
          <option className={styles.transaction_form__button} value="expense">
            Egreso
          </option>
        </select>
      </div>
      <div className={styles.transaction_form__category}>
        <select
          className={styles.transaction_form__category_select}
          name="category"
          onChange={handleChange}
          required
        >
          {options.map((option, index) => (
            <option
              className={styles.transaction_form__category_select}
              key={index}
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.transaction_form__label}>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Descripcion"
          onChange={handleChange}
          className={styles.transaction_form__input}
          required />
      </div>
      <div className={styles.transaction_form__label}>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Valor"
          onChange={handleChange}
          className={styles.transaction_form__input}
          required />
      </div>
      <div className={styles.transaction_form__btn_cont}>
        <button className={styles.transaction_form__btn} type="submit">
          <MdDone />
        </button>
      </div>
    </form></>
  );
};

export default TransactionForm;
