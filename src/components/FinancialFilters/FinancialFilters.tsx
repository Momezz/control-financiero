"use client";

import { useState } from 'react';
import styles from '@/components/FinancialFilters/financial-filters.module.css';
import {
    CalendarDays,
    CalendarRange,
    Calendar,
    RotateCcw,
    SlidersHorizontal,
} from 'lucide-react';

interface FinancialFiltersProps {
    onFilterChange: (period: {
        type: 'all' | 'week' | 'month' | 'custom';
        from: string;
        to: string;
    }) => void;
    categories: string[];
    selectedCategories: string[];
    onCategoriesChange: (categories: string[]) => void;
}

const FinancialFilters = ({
    onFilterChange,
    categories,
    selectedCategories,
    onCategoriesChange,
}: FinancialFiltersProps) => {
    const [preset, setPreset] = useState("all");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const presets = [
        { label: "Todos", value: "all" },
        { label: "Esta semana", value: "week" },
        { label: "Este mes", value: "month" },
    ] as const;

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const getPeriodRange = (type: "all" | "week" | "month" | "custom") => {
        const today = new Date();
        if (type === "all") {
            return { type: "all" as const, from: "", to: "" };
        }
        if (type === "custom") {
            return { type: "custom" as const, from, to };
        }
        if (type === "week") {
            const start = new Date(today);
            const daysSinceMonday = (start.getDay() + 6) % 7;
            start.setDate(start.getDate() - daysSinceMonday);
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            return {
                type: "week" as const,
                from: formatDate(start),
                to: formatDate(end),
            };
        }

        const start = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const end = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
        );

        return {
            type: "month" as const,
            from: formatDate(start),
            to: formatDate(end),
        };
    };

    const handleFilterChange = (
        type: "all" | "week" | "month" | "custom"
    ) => {
        setPreset(type);
        onFilterChange(getPeriodRange(type));
    };

    const handleApplyCustomPeriod = () => {
        if (!from || !to || from > to) return;
        setPreset("custom");
        onFilterChange({
            type: "custom",
            from,
            to,
        });
    };

    const handleCategoryChange = (category: string) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(item => item !== category)
            : [...selectedCategories, category];

        onCategoriesChange(updatedCategories);
    };

    const clearFilters = () => {
        setPreset("all");
        setFrom("");
        setTo("");
        onCategoriesChange([]);
        onFilterChange({
            type: "all",
            from: "",
            to: "",
        });
    };

    return (
        <section className={styles.financial_filters}>
            <div className={styles.financial_filters__header}>
                <div>
                    <h2 className={styles.financial_filters__title}>
                        Movimientos financieros
                    </h2>
                    <p className={styles.financial_filters__description}>
                        Consulta y organiza tus ingresos y gastos.
                    </p>
                </div>
                <SlidersHorizontal className={styles.financial_filters__icon} />
            </div>
            <div className={styles.summary_grid}>
                <button
                    type="button"
                    className={`${styles.summary_button} ${styles.weekly_button}`}
                    onClick={() => handleFilterChange("week")}
                >
                    <span className={`${styles.summary_icon} ${styles.weekly_icon}`}>
                        <CalendarDays className={styles.icon} />
                    </span>
                    <span>
                        <span className={`${styles.summary_title} ${styles.weekly_title}`}>
                            Ver resumen semanal
                        </span>
                        <span className={`${styles.summary_description} ${styles.weekly_description}`}>
                            Ingresos, gastos y balance
                        </span>
                    </span>
                </button>
                <button
                    type="button"
                    className={`${styles.summary_button} ${styles.monthly_button}`}
                    onClick={() => handleFilterChange("month")}
                >
                    <span className={`${styles.summary_icon} ${styles.monthly_icon}`}>
                        <CalendarRange className={styles.icon} />
                    </span>
                    <span>
                        <span className={`${styles.summary_title} ${styles.monthly_title}`}>
                            Ver resumen mensual
                        </span>
                        <span className={`${styles.summary_description} ${styles.monthly_description}`}>
                            Ingresos, gastos y balance
                        </span>
                    </span>
                </button>
            </div>
            <div className={styles.period_section}>
                <h3 className={styles.period_heading}>
                    Período de consulta
                </h3>
                <div className={styles.period_options}>
                    {presets.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => handleFilterChange(item.value)}
                            aria-pressed={preset === item.value}
                            className={`${styles.period_button} ${preset === item.value
                                ? styles.period_button__active
                                : styles.period_button__inactive
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.custom_date__section}>
                <h3 className={styles.custom_date__heading}>
                    Rango personalizado
                </h3>
                <div className={styles.date_grid}>
                    <label className={styles.date_label}>
                        <span className={styles.date_labelText}>
                            Fecha inicial
                        </span>
                        <span className={styles.date_input_wrapper}>
                            <Calendar className={styles.date_icon} />
                            <input
                                type="date"
                                value={from}
                                max={to || undefined}
                                onChange={(e) => {
                                    setFrom(e.target.value);
                                    setPreset("custom");
                                }}
                                className={styles.date_input}
                            />
                        </span>
                    </label>
                    <label className={styles.date_label}>
                        <span className={styles.date_labelText}>
                            Fecha final
                        </span>
                        <span className={styles.date_input_wrapper}>
                            <Calendar className={styles.date_icon} />
                            <input
                                type="date"
                                value={to}
                                min={from || undefined}
                                onChange={(e) => {
                                    setTo(e.target.value);
                                    setPreset("custom");
                                }}
                                className={styles.date_input}
                            />
                        </span>
                    </label>
                </div>
            </div>
            <div className={styles.category_section}>
                <h3 className={styles.period_heading}>
                    Categorías de gastos
                </h3>
                <p className={styles.category_description}>
                    Selecciona una o varias categorías para filtrar tus gastos.
                </p>
                <div className={styles.category_options}>
                    {categories.map((category) => (
                        <label
                            key={category}
                            className={styles.category_option}
                        >
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                            <span>{category}</span>
                        </label>
                    ))}
                </div>
                {categories.length === 0 && (
                    <p className={styles.category_description}>
                        No hay categorías de gastos disponibles.
                    </p>
                )}
                {selectedCategories.length > 0 && (
                    <button
                        type="button"
                        onClick={() => onCategoriesChange([])}
                        className={styles.category_clear_button}
                    >
                        Quitar selección de categorías
                    </button>
                )}
            </div>
            <div className={styles.filter_actions}>
                <button
                    type="button"
                    onClick={clearFilters}
                    className={styles.clear_filters_button}
                >
                    <RotateCcw className={styles.reset_icon} />
                    Limpiar filtros
                </button>
                <button
                    type="button"
                    onClick={handleApplyCustomPeriod}
                    disabled={!from || !to || from > to}
                    className={styles.apply_filter__button}
                >
                    Aplicar período
                </button>
            </div>
        </section>
    );
};

export default FinancialFilters;
