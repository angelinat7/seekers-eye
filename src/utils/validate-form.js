import { validateInputField } from "./validate-input-field";

export const validateForm = (fields) => {
  const newErrors = {};

  fields.forEach((field) => {
    const error = validateInputField(field, values[field], values);
    if (error) newErrors[field] = error;
  });
  StorageError(newErrors);

  return newErrors;
};
