export const validateInputField = (field, value, values = {}) => {
  switch (field) {
    case "email":
      if (!value) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid email address";
      return null;

    case "username":
      if (!value) return "Username is required";
      if (value.length < 3) return "Username must be at least 3 characters";
      return null;

    case "password":
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return null;

    case "confirmPassword":
      if (!value) return "Please confirm your password";
      if (value !== values.password) return "Passwords do not match";
      return null;
  }
};
