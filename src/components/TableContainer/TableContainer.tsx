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
    selectedCategories: string[];
    onCategoriesChange: (categories: string[]) => void;
}

const TableContainer = ({
    period,
    onPeriodChange,
    selectedCategories,
    onCategoriesChange,
}: TableContainerProps) => {
    const incomes = useSelector(selectIncomeList);
    const expenses = useSelector(selectExpenseList);
    const categories = Array.from(
        new Set(
            [...incomes, ...expenses]
                .map(item => item.category?.trim())
                .filter((category): category is string => Boolean(category))
        )
    ).sort((a, b) => a.localeCompare(b));
    const matchesPeriod = (item: Item): boolean => {
        if (period.type === 'all') return true;
        const date = new Date(item.createdAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const itemDate = `${year}-${month}-${day}`;
        return itemDate >= period.from && itemDate <= period.to;
    };

    const filteredIncomes = incomes.filter(item => {
        const matchesDate = matchesPeriod(item);
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(item.category?.trim());
        return matchesDate && matchesCategory;
    });

    const filteredExpenses = expenses.filter(item => {
        const matchesDate = matchesPeriod(item);
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(item.category?.trim());
        return matchesDate && matchesCategory;
    });
    return (
        <>
            <FinancialFilters
                onFilterChange={onPeriodChange}
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoriesChange={onCategoriesChange}
            />
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
