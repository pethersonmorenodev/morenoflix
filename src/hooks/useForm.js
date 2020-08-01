import { useState } from 'react';

const useForm = valoresIniciais => {
  const [values, setValues] = useState(valoresIniciais);
  const setValue = (key, value) => {
    setValues(old => ({ ...old, [key]: value }));
  };
  const handleChange = event => {
    const { value } = event.target;
    const name = event.target.getAttribute('name');
    setValue(name, value);
  };
  const clearForm = () => {
    setValues(valoresIniciais);
  };
  return { values, handleChange, clearForm };
};

export default useForm;
