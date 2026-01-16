import styles from '@/components/CreateCategory/create-category.module.css';
import { createCategory } from '@/services/categories';
import { MdDone } from 'react-icons/md';
import useForm from '@/redux/hooks';

interface CreateCategoryProps {
  onCategoryCreated?: () => void;
}

const CreateCategory = ({ onCategoryCreated }: CreateCategoryProps) => {
  const { form, handleChange } = useForm({});
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createCategory(form);
      onCategoryCreated?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={styles.create_category__container}
      onSubmit={handleSubmit}
    >
      <input
        className={styles.create_category__input}
        placeholder="Crear categoria"
        onChange={handleChange}
        name="name"
        type="text"
        id="name"
        required
      />
      <button className={styles.create_category__btn} type="submit">
        <MdDone />
      </button>
    </form>
  );
};

export default CreateCategory;
