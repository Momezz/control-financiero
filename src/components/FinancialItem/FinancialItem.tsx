import PropTypes from 'prop-types';
import styles from '@/components/FinancialItem/financial-item.module.css';

interface FinancialItemProps {
  title: string;
  value: number;
}

const FinancialItem: React.FC<FinancialItemProps> = ({ title, value }) => {
  const componentClass = title === 'Ingresos' ? styles.financial_item__income : styles.financial_item__expenses ;
  return (
    <div className={`${styles.financial_item__container} ${componentClass}`}>
      <h3 className={styles.financial_item__title}>{title}</h3>
    <p className={styles.financial_item__paragraph}>{value}</p>
      <div className={`${styles.financial_item__percentage} ${componentClass}`}>
        {
          title !== 'Ingresos' ? <span>33%</span> : null
        }
      </div>
    </div>
  )
}

FinancialItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default FinancialItem;
