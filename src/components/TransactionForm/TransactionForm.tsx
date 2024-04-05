"use client";

import styles from "@/components/TransactionForm/transaction-form.module.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import React, { useState } from "react";

const TransactionForm = () => {
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const opciones = ["Seleccionar categoria", "Opción 1", "Opción 2", "Opción 3"];
  const [selectedOption, setSelectedOption] = useState(opciones[0]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Descripción:", descripcion);
    console.log("Categoría:", categoria);
    setDescripcion("");
    setCategoria("");
  };

  return (
    <form
      className={styles.transaction_form__container}
      onSubmit={handleSubmit}
    >
      <div className={styles.transaction_form__option}>
        <button
          className={`${styles.transaction_form__button} ${styles.transaction_form__button_add}`}
          type="button"
        >
          <IoAddCircleOutline />
        </button>
        <button
          className={`${styles.transaction_form__button} ${styles.transaction_form__button_sub}`}
          type="button"
        >
          <GrSubtractCircle />
        </button>
      </div>
      <div className={styles.transaction_form__category}>
        <button
          className={styles.transaction_form__category_btn}
          type="button"
        >
          Crear categoria
        </button>
        <select
          className={styles.transaction_form__category_select}
          id="opciones"
          value={selectedOption}
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
          className={styles.transaction_form__input}
          placeholder="Descripcion"
          type="text"
          value="Descripcion"
        />
      </div>
      <div className={styles.transaction_form__label}>
        <input
          className={styles.transaction_form__input}
          placeholder="Valor"
          type="text"
          value="Valor"
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
