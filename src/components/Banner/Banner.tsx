import styles from '@/components/Banner/banner.module.css';
import FinancialItem from '../FinancialItem/FinancialItem';

const Banner = () => {
  return (
    <article className={styles.banner__container}>
      <h2 className={styles.banner__title}>Presupuesto disponible</h2>
      <p className={styles.banner__title}>$ 20000.00</p>
      <div className={styles.banner__item_container}>
        <FinancialItem title="Ingresos" value={1000} />
        <FinancialItem title="Egresos" value={1000} />
      </div>
      <div className={styles.banner__layer} ></div>
    </article>
  )
}

export default Banner;
