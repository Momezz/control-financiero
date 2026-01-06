"use client";

import { AppDispatch } from '@/redux/store';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdDone } from 'react-icons/md';
import type { Item } from '@/redux/features/financialItem/financialItemSlice';
import { updateFinancialItem, FinancialItemFormData } from '@/redux/features/financialItem/financialItemSlice';
import { getCategories } from '@/services/categories';
import useForm from '@/redux/hooks';
import styles from './edit-item.module.css';

interface EditItemProps {
  item: Item;
  onClose: () => void;
}

const EditItem = ({ item, onClose }: EditItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [options, setOptions] = useState([]);
  const [id, setId] = useState(item._id);
  const { form, handleChange } = useForm<FinancialItemFormData>({
    transactionType: item.transactionType,
    category: item.category,
    description: item.description,
    amount: item.amount,
  });

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      setOptions(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(
        updateFinancialItem({
          id,
          financialitem: {
            transactionType: form.transactionType,
            category: form.category,
            description: form.description,
            amount: Number(form.amount) || 0,
          },
        })
      );
      onClose()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.edit_item_form__container} onSubmit={handleSubmit}>
      <div className={styles.edit_item_form__option}>
        <select
          className={styles.edit_item_form__select}
          value={form.transactionType}
          onChange={handleChange}
          name="transactionType"
          required
        >
          <option value="">+-</option>
          <option value="income">Ingreso</option>
          <option value="expense">Egreso</option>
        </select>
      </div>
      <div className={styles.edit_item_form__category}>
        <select
          className={styles.edit_item_form__category_select}
          value={form.category}
          name="category"
          onChange={handleChange}
          required
        >
          {options.map((option, index) => (
            <option
              className={styles.edit_item_form__category_select}
              key={index}
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.edit_item_form__label}>
        <input
          type="text"
          id="description"
          value={form.description}
          name="description"
          placeholder="Descripcion"
          onChange={handleChange}
          className={styles.edit_item_form__input}
          required
        />
      </div>
      <div className={styles.edit_item_form__label}>
        <input
          type="number"
          value={form.amount}
          id="amount"
          name="amount"
          placeholder="Valor"
          onChange={handleChange}
          className={styles.edit_item_form__input}
          required
        />
      </div>
      <div className={styles.edit_item_form__btn_cont}>
        <button
          onClick={onClose}
          type="button"
          className={styles.edit_item_form__back}
        >
          Regresar
        </button>
        <button className={styles.edit_item_form__btn} type="submit">
          <MdDone />
        </button>
      </div>
    </form>
  );
};

export default EditItem;
