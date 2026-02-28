import { useState } from "react";

export const useForm = ({ initialValues, fields, validateField }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, values[field], values);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return newErrors;
  };

  return {
    values,
    errors,
    setValues,
    handleInputChange,
    validateForm,
  };
};
