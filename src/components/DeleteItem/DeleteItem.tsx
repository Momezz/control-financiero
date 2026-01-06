import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import type { Item } from '@/redux/features/financialItem/financialItemSlice';
import { deleteFinancialItem } from '@/redux/features/financialItem/financialItemSlice';
import styles from './delete-item.module.css';

interface DeleteItemProps {
  item: Item;
  onClose: () => void;
}

const DeleteItem = ({ item, onClose }: DeleteItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleteItem = () => {
    dispatch(deleteFinancialItem(item._id))
  }

  return (
    <div className={styles.delete_item__container}>
      <p className={styles.delete_item__text}>Eliminaras definitivamente {item.description}</p>
      <div className={styles.delete_item__btns}>
        <button
          className={styles.delete_item__btn}
          onClick={onClose}
          type="button">
          Regresar
        </button>
        <button
          onClick={handleDeleteItem}
          className={`${styles.delete_item__btn} ${styles.delete_item__btn_delete}`}
          type="button">Eliminar</button>
      </div>
    </div>
  );
};

export default DeleteItem;
