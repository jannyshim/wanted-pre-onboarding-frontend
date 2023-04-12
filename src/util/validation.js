export const isEmailValid = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export const isPasswordValid = (password) => {
  return password.length >= 8;
};
