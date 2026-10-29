"use client";

import { useSelector } from 'react-redux';
import {
  selectIncomeList,
  selectExpenseList,
} from '@/redux/features/financialItem/selectors';
import ResultsTable from '../ResultsTable/ResultsTable';
import FinancialFilters from '../FinancialFilters/FinancialFilters';
import styles from '@/components/TableContainer/table-container.module.css';
import type { Item } from '@/types/Item';
import type { PeriodFilter } from '@/types/PeriodFilter';

interface TableContainerProps {
  period: PeriodFilter;
  onPeriodChange: (period: PeriodFilter) => void;
}

const TableContainer = ({
  period,
  onPeriodChange,
}: TableContainerProps) => {
  const incomes = useSelector(selectIncomeList);
  const expenses = useSelector(selectExpenseList);
  const filterItems = (items: Item[]): Item[] => {
    if (period.type === 'all') return items;
    return items.filter((item) => {
      const date = new Date(item.createdAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const itemDate = `${year}-${month}-${day}`;
      return itemDate >= period.from && itemDate <= period.to;
    });
  };

  const filteredIncomes = filterItems(incomes);
  const filteredExpenses = filterItems(expenses);

  return (
    <>
      <FinancialFilters onFilterChange={onPeriodChange} />
      <article className={styles.table_container__container}>
        <div className={styles.table_container__sub_container}>
          <h2 className={styles.table_container__title}>Ingresos</h2>
          <div className={styles.table_container__component_con}>
            <ResultsTable data={filteredIncomes} />
          </div>
        </div>
        <div className={styles.table_container__sub_container}>
          <h2
            className={`${styles.table_container__title_egresos} ${styles.table_container__title}`}
          >
            Egresos
          </h2>
          <div className={styles.table_container__component_con}>
            <ResultsTable data={filteredExpenses} />
          </div>
        </div>
      </article>
    </>
  );
};

export default TableContainer;
