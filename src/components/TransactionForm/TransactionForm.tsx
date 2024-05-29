"use client";

import styles from '@/components/TransactionForm/transaction-form.module.css';
import { MdDone } from 'react-icons/md';
import React, { useState } from 'react';
import useForm from '@/redux/hooks';
import { createTransaction } from '@/services/transactions';

const TransactionForm = () => {
  const opciones = [
    "",
    "Opción 1",
    "Opción 2",
    "Opción 3",
  ];
  const { form, handleChange } = useForm({});
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      createTransaction(form);
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <form
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
          <option className={styles.transaction_form__button} value="egress">
            Egreso
          </option>
        </select>
      </div>
      <div className={styles.transaction_form__category}>
        <button className={styles.transaction_form__category_btn} type="button">
          Crear categoria
        </button>
        <select
          className={styles.transaction_form__category_select}
          name="category"
          onChange={handleChange}
          required
        >
          
          {opciones.map((opcion, index) => (
            <option
              className={styles.transaction_form__category_select}
              key={index}
              
            >
              {opcion}
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
          required
        />
      </div>
      <div className={styles.transaction_form__label}>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Valor"
          onChange={handleChange}
          className={styles.transaction_form__input}
          required
        />
      </div>
      <div className={styles.transaction_form__btn_cont}>
        <button className={styles.transaction_form__btn} type="submit">
          <MdDone />
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
