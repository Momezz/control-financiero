"use client";

import styles from './user-form.module.css';

const UserForm = () => {

  return (
    <article className={styles.user_form__container}>
      <form className={styles.user_form__subcont}>
        <input
          type="name"
          id="name"
          name="name"
          placeholder="Name"
          className={styles.user_form__input}
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className={styles.user_form__input}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className={styles.user_form__input}
          required
        />
        <input className={styles.user_form__btn} type="submit" value="Sign in" />
      </form>
    </article>
  );
};

export default UserForm;
