import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectorSpedingRAte } from '@/redux/features/financialItem/selectors';
import { formatNumber, formatSpendingRate } from '@/utils/numberFormat';
import styles from '@/components/FinancialItem/financial-item.module.css';

interface FinancialItemProps {
  title: string;
  value: number;
}

const FinancialItem: React.FC<FinancialItemProps> = ({ title, value }) => {
  const spedingRAte = useSelector(selectorSpedingRAte);
  const componentClass = title === 'Ingresos' ? styles.financial_item__income : styles.financial_item__expenses;
  const getSpendingRateClass = (rate: number) => {
    if (rate < 20) return styles.rateLow;
    if (rate < 50) return styles.rateMedium;
    return styles.rateHigh;
  };

  return (
    <div className={`${styles.financial_item__container} ${componentClass}`}>
      <h3 className={styles.financial_item__title}>{title}</h3>
      <p className={styles.financial_item__paragraph}>{formatNumber(value)}</p>
      <div className={`${styles.financial_item__percentage} ${componentClass}`}>
        {title !== 'Ingresos' && (
          <span
            className={`${styles.spendingRate} ${getSpendingRateClass(spedingRAte)}`}
          >
            {formatSpendingRate(spedingRAte)}%
            <span className={styles.tooltip}>Tasa de gasto</span>
          </span>
        )}
      </div>
    </div>
  )
}

FinancialItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default FinancialItem;
