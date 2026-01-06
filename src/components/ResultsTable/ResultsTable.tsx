"use client";

import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit, FaEye, FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import { formatNumber } from '@/utils/numberFormat';
import type { Item } from '@/redux/features/financialItem/financialItemSlice';
import SeeDetails from '../SeeDetails/SeeDetails';
import DeleteItem from '../DeleteItem/DeleteItem';
import EditItem from '../EditItem/EditItem';
import styles from '@/components/ResultsTable/results-table.module.css';

interface ResultsTableProps {
  data: Item[];
}

const ITEM_PER_PAGE = 10;
const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const totalPages = Math.ceil(data.length / ITEM_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
  const endIndex = startIndex + ITEM_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <>
      <div>
        {showDetails && selectedItem ? (
          <div className={styles.results_table__see_details_container}>
            <SeeDetails
              item={selectedItem}
              onClose={() => {
                setShowDetails(false);
                setSelectedItem(null);
              }}
            />
          </div>
        ) : showEdit && selectedItem ? (
          <div className={styles.results_table__see_details_container}>
            <EditItem
              item={selectedItem}
              onClose={() => {
                setShowEdit(false);
                setSelectedItem(null);
              }}
            />
          </div>
        ) : showDelete && selectedItem ? (
          <div className={styles.results_table__see_details_container}>
            <DeleteItem
              item={selectedItem}
              onClose={() => {
                setShowEdit(false);
                setSelectedItem(null);
              }}
            />
          </div>
        ) : (
          <table className={styles.results_table__container}>
            <tbody className={styles.results_table__body}>
              {currentData.map((item) => (
                <tr className={styles.results_table__tr} key={item._id}>
                  <td className={styles.results_table__td_item}>
                    {item.description}
                  </td>
                  <td className={styles.results_table__td_value}>
                    $ {formatNumber(item.amount)}
                  </td>
                  <td className={styles.results_table__td_actions}>
                    <div className={styles.results_table__icons}>
                      <button
                        className={styles.results_table__icon_button}
                        onClick={() => {
                          setSelectedItem(item);
                          setShowDelete(true);
                        }}
                      >
                        <MdDeleteForever />
                      </button>
                      <button
                        className={styles.results_table__icon_button}
                        onClick={() => {
                          setSelectedItem(item);
                          setShowEdit(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowDetails(true);
                        }}
                        className={styles.results_table__icon_button}
                      >
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {!showDetails && (
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
      )}
    </>
  );
};

export default ResultsTable;
