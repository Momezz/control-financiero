import LoginForm from '@/components/LoginForm/LoginForm';
import UserForm from '@/components/UserForm/UserForm';
import EffectBars from '@/components/EffectBars/EffectBars';
import styles from './login.module.css';

const Login = () => {
  return (
    <main>
      <article className={styles.login__container}>
        <LoginForm />
        <UserForm />
        <EffectBars />
      </article>
    </main>
  )
}

export default Login
