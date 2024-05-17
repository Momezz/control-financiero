import { useState, ChangeEvent } from 'react';

interface FormValues {
  [key: string]: string;
}

type HandleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

const useForm = (initialValue: FormValues) => {
  const [form, setForm] = useState<FormValues>(initialValue);
  const handleChange: HandleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };
  return {
    form,
    handleChange,
  };
};

export default useForm;
