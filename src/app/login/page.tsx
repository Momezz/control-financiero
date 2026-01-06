"use client"

import { useState } from 'react';
import LoginForm from '@/components/LoginForm/LoginForm';
import UserForm from '@/components/UserForm/UserForm';
import styles from './login.module.css';

const Login = () => {
  const [existingAccount, setExistingAccount] = useState(true);
  return (
    <main>
      <article className={styles.login__container}>
        {
          existingAccount ?
            <LoginForm
              onClose={() => {
                setExistingAccount(!existingAccount);
              }}
            /> :
            <UserForm
              onClose={() => {
                setExistingAccount(!existingAccount);
              }} />
        }
      </article>
    </main>
  )
}

export default Login
