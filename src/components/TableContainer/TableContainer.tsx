"use client";

import { useSelector } from 'react-redux';
import { selectIncomeList, selectExpenseList } from '@/redux/features/financialItem/selectors';
import ResultsTable from '../ResultsTable/ResultsTable';
import styles from '@/components/TableContainer/table-container.module.css';

const TableContainer = () => {
  const incomes = useSelector(selectIncomeList);
  const incomeTableData = incomes.map(item => ({
    item: item.description,
    value: item.amount,
    percentage: 0
  }));

  const expense = useSelector(selectExpenseList);
  const expenseTableData = expense.map(item => ({
    item: item.description,
    value: item.amount,
    percentage: 0
  }));

  return (
    <article className={styles.table_container__container}>
      <div className={styles.table_container__sub_container}>
        <h2 className={styles.table_container__title}>Ingresos</h2>
        <div className={styles.table_container__component_con}>
          <ResultsTable data={incomeTableData} />
        </div>
      </div>
      <div className={styles.table_container__sub_container}>
        <h2 className={`${styles.table_container__title_egresos} ${styles.table_container__title}`}>Egresos</h2>
        <div className={styles.table_container__component_con}>
          <ResultsTable data={expenseTableData} />
        </div>
      </div>
    </article>
  )
}

export default TableContainer;
