"use client";

import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit, FaEye, FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import { formatNumber } from '@/utils/numberFormat';
import styles from '@/components/ResultsTable/results-table.module.css';

interface ResultsTableProps {
  data: {
    item: string;
    value: number;
  }[];
}
const ITEM_PER_PAGE = 10;

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEM_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
  const endIndex = startIndex + ITEM_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  return (<>
    <table className={styles.results_table__container}>
      <tbody className={styles.results_table__body}>
        {currentData.map((item, index) => (
          <tr className={styles.results_table__tr} key={index}>
            <td className={styles.results_table__td_item}>{item.item}</td>
            <td className={styles.results_table__td_value}>$ {formatNumber(item.value)}</td>
            <td className={styles.results_table__td_actions}>
              <div className={styles.results_table__icons}>
                <button className={styles.results_table__icon_button}>
                  <MdDeleteForever />
                </button>
                <button className={styles.results_table__icon_button}>
                  <FaEdit />
                </button>
                <button className={styles.results_table__icon_button}>
                  <FaEye />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className={styles.results_table__button_container}>
      <button
        className={styles.results_table__button}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(p => p - 1)}
      >
        <FaChevronCircleLeft />
      </button>

      <span className={styles.results_table__message_page}>
        Página {currentPage} de {totalPages}
      </span>

      <button
        className={styles.results_table__button}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(p => p + 1)}
      >
        <FaChevronCircleRight />
      </button>
    </div>
  </>
  );
};

export default ResultsTable;
