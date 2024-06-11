"use client";

import styles from './user-form.module.css';
import useForm from '@/redux/hooks';
import { createUser } from '@/services/users';

const UserForm = () => {
  const { form, handleChange } = useForm({});
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      createUser(form);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <article className={styles.user_form__container}>
      <form onSubmit={handleSubmit} className={styles.user_form__subcont}>
        <input
          type="firstName"
          id="firstName"
          name="firstName"
          placeholder="Nombre"
          className={styles.user_form__input}
          onChange={handleChange}
          required
        />
        <input
          type="lastName"
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
