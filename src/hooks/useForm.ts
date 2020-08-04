import { useState, useEffect, useCallback } from 'react';

type TParamsUseForm<TData, TErrors> = {
  initialValues: TData;
  validate?: (values: TData) => TErrors;
};
function useForm<TData, TErrors>({
  initialValues,
  validate,
}: TParamsUseForm<TData, TErrors>): {
  values: TData;
  errors: TErrors;
  touched: any;
  invalid: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  clearForm: () => void;
} {
  const [errors, setErrors] = useState({} as TErrors);
  const [touched, setTouchedFields] = useState<any>({});
  const [invalid, setInvalid] = useState(true);
  const [values, setValues] = useState<TData>(initialValues);
  useEffect(() => {
    if (validate) {
      const newErrors = validate(values);
      const newInvalid = !!Object.keys(newErrors).find(k => !!(newErrors as any)[k]);
      setErrors(newErrors);
      setInvalid(newInvalid);
    }
  }, [values, validate]);
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = event.target.getAttribute('name');
    if (!fieldName) {
      return;
    }
    const { value } = event.target;
    setValues(oldValues => ({
      ...oldValues,
      [fieldName]: value,
    }));
  }, []);
  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = event.target.getAttribute('name');
    if (!fieldName) {
      return;
    }
    setTouchedFields((oldValues: any) => ({ ...oldValues, [fieldName]: true }));
  }, []);
  const clearForm = useCallback(() => {
    setValues(initialValues);
    setTouchedFields({});
  }, [initialValues]);
  return {
    values,
    errors,
    touched,
    invalid,
    handleChange,
    handleBlur,
    clearForm,
  };
}

export default useForm;
