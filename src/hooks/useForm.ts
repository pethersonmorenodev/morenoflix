import { useState } from 'react';

function useForm<T>(
  valoresIniciais: T,
): {
  values: T;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  clearForm: () => void;
} {
  const [values, setValues] = useState<T>(valoresIniciais);
  const setValue = (key: string, value: any) => {
    setValues(old => ({ ...old, [key]: value }));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    const name = event.target.getAttribute('name');
    if (name) {
      setValue(name, value);
    }
  };
  const clearForm = () => {
    setValues(valoresIniciais);
  };
  return { values, handleChange, clearForm };
}

export default useForm;
