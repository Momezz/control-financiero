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

const FinancialFilters = () => {
    const [preset, setPreset] = useState("all");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const presets = [
        { label: "Todos", value: "all" },
        { label: "Esta semana", value: "week" },
        { label: "Este mes", value: "month" },
    ];

    const clearFilters = () => {
        setPreset("all");
        setFrom("");
        setTo("");
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

                <SlidersHorizontal
                    className={styles.financial_filters__icon}
                />
            </div>

            <div className={styles.summary_grid}>
                <button
                    type="button"
                    className={`${styles.summary_button} ${styles.weekly_button}`}
                >
                    <span
                        className={`${styles.summary_icon} ${styles.weekly_icon}`}
                    >
                        <CalendarDays className={styles.icon} />
                    </span>

                    <span>
                        <span
                            className={`${styles.summary_title} ${styles.weekly_title}`}
                        >
                            Ver resumen semanal
                        </span>

                        <span
                            className={`${styles.summary_description} ${styles.weekly_description}`}
                        >
                            Ingresos, gastos y balance
                        </span>
                    </span>
                </button>

                <button
                    type="button"
                    className={`${styles.summary_button} ${styles.monthly_button}`}
                >
                    <span
                        className={`${styles.summary_icon} ${styles.monthly_icon}`}
                    >
                        <CalendarRange className={styles.icon} />
                    </span>

                    <span>
                        <span
                            className={`${styles.summary_title} ${styles.monthly_title}`}
                        >
                            Ver resumen mensual
                        </span>

                        <span
                            className={`${styles.summary_description} ${styles.monthly_description}`}
                        >
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
                            onClick={() => setPreset(item.value)}
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

            {/* Fechas personalizadas */}
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

            {/* Acciones visuales */}
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
                    onClick={() => setPreset("custom")}
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