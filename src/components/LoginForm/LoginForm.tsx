"use client";

import styles from './login-form.module.css';

const LoginForm = () => {
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log("Submit");
  };

  return (
    <article className={styles.login__container}>
      <form className={styles.login__subcont} onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className={styles.login__input}
          required
        />
        <br />
        <input
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
    </article>
  );
};

export default LoginForm;
