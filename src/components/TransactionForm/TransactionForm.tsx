"use client";

import styles from '@/components/TransactionForm/transaction-form.module.css';
import { MdDone } from 'react-icons/md';
import React, { useState } from 'react';
import useForm from '@/redux/hooks';

const TransactionForm = () => {
  const opciones = [
    "Seleccionar categoria",
    "Opción 1",
    "Opción 2",
    "Opción 3",
  ];
  const [selectedOption, setSelectedOption] = useState(opciones[0]);
  const { form, handleChange } = useForm({});
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form-> ', form);
  };

  return (
    <form
      className={styles.transaction_form__container}
      onSubmit={handleSubmit}
    >
      <select className={styles.transaction_form__category_select} onChange={handleChange} name="transactionType">
        <option className={styles.transaction_form__category_select} value="">
          Option{" "}
        </option>
        <option className={styles.transaction_form__category_select} value="income">
          Ingreso
        </option>
        <option className={styles.transaction_form__category_select} value="egress">
          Egreso
        </option>
      </select>
      <div className={styles.transaction_form__category}>
        <button className={styles.transaction_form__category_btn} type="button">
          Crear categoria
        </button>
        <select
          className={styles.transaction_form__category_select}
          name="category"
          value={selectedOption}
          onChange={handleChange}
        >
          {opciones.map((opcion, index) => (
            <option
              className={styles.transaction_form__category_select}
              key={index}
              value={opcion}
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
        />
      </div>
      <div className={styles.transaction_form__label}>
        <input
          type="number"
          id="value"
          name="value"
          placeholder="Valor"
          onChange={handleChange}
          className={styles.transaction_form__input}
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
