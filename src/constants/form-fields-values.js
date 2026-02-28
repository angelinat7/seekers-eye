export const FIELD_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const FIELD_LENGTHS = {
  username: {
    min: 3,
    max: 18,
  },
  password: {
    min: 6,
  },
  title: {
    min: 3,
    max: 30,
  },
  description: {
    min: 20,
    max: 200,
  },
};
