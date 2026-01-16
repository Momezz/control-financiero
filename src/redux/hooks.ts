import { useState } from 'react';

function useForm<T extends object>(initialValues: T) {
  const [form, setForm] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return { form, handleChange };
}

export default useForm;

