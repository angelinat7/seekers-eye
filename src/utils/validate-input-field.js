import { FIELD_LENGTHS, FIELD_PATTERNS } from "../constants/form-fields-values";

export const validateInputField = (field, value, values = {}) => {
  const userInput = value.trim();
  switch (field) {
    case "email":
      if (!userInput) return "Email is required";
      if (!FIELD_PATTERNS.email.test(userInput)) return "Invalid email address";
      return null;

    case "username":
      if (!userInput) return "Username is required";
      if (userInput.length < FIELD_LENGTHS.username.min)
        return `Username must be at least ${FIELD_LENGTHS.username.min}characters`;
      return null;

    case "password":
      if (!userInput) return "Password is required";
      if (userInput.length < FIELD_LENGTHS.password.min)
        return `Password must be at least ${FIELD_LENGTHS.password.min} characters`;
      return null;

    case "confirmPassword":
      if (!userInput) return "Please confirm your password";
      if (userInput !== values.password) return "Passwords do not match";
      return null;

    case "title":
      if (!userInput) return "Title is required";
      if (userInput.length < FIELD_LENGTHS.title.min)
        return `Title must be at least ${FIELD_LENGTHS.title.min} characters`;
      if (userInput.length > FIELD_LENGTHS.title.max)
        return `Title must be less than ${FIELD_LENGTHS.title.max} characters`;
      return null;

    case "description":
      if (!userInput) return "Description is required";
      if (userInput.length < FIELD_LENGTHS.description.min)
        return `Description must be at least ${FIELD_LENGTHS.description.min} characters`;
      if (userInput.length > FIELD_LENGTHS.description.max)
        return `Title must be less than ${FIELD_LENGTHS.description.max} characters`;
      return null;
  }
};
