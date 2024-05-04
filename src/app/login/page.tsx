import LoginForm from '@/components/LoginForm/LoginForm';
import styles from './login.module.css';

const Login = () => {
  return (
    <main>
      <article className={styles.login__container}>
        <LoginForm />
      </article>
    </main>
  )
}

export default Login
