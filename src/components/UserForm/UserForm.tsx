"use client";

import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import styles from './user-form.module.css';
import useForm from '@/redux/hooks';
import { createUser } from '@/redux/features/userSlice';

const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { form, handleChange } = useForm({});
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newUser = await dispatch(createUser({
        ...form,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password
      })).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <article className={styles.user_form__container}>
      <form onSubmit={handleSubmit} className={styles.user_form__subcont}>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Nombre"
          className={styles.user_form__input}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Apellidos"
          className={styles.user_form__input}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className={styles.user_form__input}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className={styles.user_form__input}
          onChange={handleChange}
          required
        />
        <input
          className={styles.user_form__btn}
          type="submit"
          value="Sign in"
        />
      </form>
    </article>
  );
};

export default UserForm;
