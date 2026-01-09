"use client";

import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '@/redux/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setAccessToken } from '@/redux/features/auth/authSlice';
import { login } from '@/services/auth';
import styles from './login-form.module.css';

interface LoginUser {
  onClose: () => void;
}

interface userLogged {
  email: string,
  password: string
}

const LoginForm = ({ onClose }: LoginUser) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated]);
  const { form, handleChange } = useForm<userLogged>({ email: "", password: "" });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    dispatch(setAccessToken(result.accessToken));
  };

  return (
    <article className={styles.login__container}>
      <form className={styles.login__subcont} onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className={styles.login__input}
          required
        />
        <br />
        <input
          onChange={handleChange}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className={styles.login__input}
          required
        />
        <br />
        <input className={styles.login__btn} type="submit" value="Sign in" />
      </form>
      <button onClick={onClose} className={styles.login__btn_text}>
        Aún no tengo una cuenta
      </button>
    </article>
  );
};

export default LoginForm;
