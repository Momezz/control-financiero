import styles from '@/components/TableContainer/table-container.module.css';
import ResultsTable from '../ResultsTable/ResultsTable';

const TableContainer = () => {
  const datosEconomicos = [
    { item: 'Producto A', value: 400, percentage: 5 },
    { item: 'Producto B', value: 200, percentage: 15 },
    { item: 'Producto C', value: 150, percentage: 12 },
  ];
  return (
    <article className={styles.table_container__container}>
      <div className={styles.table_container__sub_container}>
        <h2 className={styles.table_container__title}>Ingresos</h2>
        <ResultsTable data={datosEconomicos} />
      </div>
      <div className={styles.table_container__sub_container}>
        <h2 className={`${styles.table_container__title_egresos} ${styles.table_container__title}`}>Egresos</h2>
        <ResultsTable data={datosEconomicos} />
      </div>
    </article>
  )
}

export default TableContainer;
