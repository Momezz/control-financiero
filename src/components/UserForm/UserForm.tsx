"use client";

import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { User } from '@/redux/features/userSlice';
import useForm from '@/redux/hooks';
import { createUser } from '@/redux/features/userSlice';
import styles from './user-form.module.css';

interface UserForm {
  onClose: () => void;
}

const UserForm = ({ onClose }: UserForm) => {
  const dispatch = useDispatch<AppDispatch>();
  const { form, handleChange } = useForm<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
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
        <button
          className={styles.user_form__btn}
          type="submit">
          Sign up
        </button>
      </form>
      <button onClick={onClose} className={styles.user_form__btn_text}>Ya tengo una cuenta</button>
    </article>
  );
};

export default UserForm;
