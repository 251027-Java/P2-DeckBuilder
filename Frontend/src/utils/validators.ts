// TODO: Create validation functions (email, password strength, deck size)
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidDeckSize = (size: number): boolean => {
  return size >= 1 && size <= 60;
};
