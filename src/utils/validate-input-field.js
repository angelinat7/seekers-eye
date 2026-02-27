export const validateInputField = (field, value, values = {}) => {
  const userInput = value.trim();
  switch (field) {
    case "email":
      if (!userInput) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInput)) return "Invalid email address";
      return null;

    case "username":
      if (!userInput) return "Username is required";
      if (userInput.length < 3) return "Username must be at least 3 characters";
      return null;

    case "password":
      if (!userInput) return "Password is required";
      if (userInput.length < 6) return "Password must be at least 6 characters";
      return null;

    case "confirmPassword":
      if (!userInput) return "Please confirm your password";
      if (userInput !== values.password) return "Passwords do not match";
      return null;
  }
};
