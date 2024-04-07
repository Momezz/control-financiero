import PropTypes from 'prop-types';
import styles from '@/components/ResultsTable/results-table.module.css';

interface ResultsTableProps {
  data: {
    item: string;
    value: number;
    percentage: number;
  }[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  return (
    <table className={styles.results_table__container}>
      <tbody className={styles.results_table__body}>
        {data.map((item, index) => (
          <tr className={styles.results_table__tr} key={index}>
            <td className={styles.results_table__td_item}>{item.item}</td>
            <td className={styles.results_table__td_value}>{item.value}</td>
            <td className={styles.results_table__td_percentage}>{item.percentage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ResultsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      percentage: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default ResultsTable;
