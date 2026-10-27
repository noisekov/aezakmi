const ERROR_MSGS = {
  EMAIL: "Please enter a valid email address",
  PASSWORD: "Password must be at least 6 characters",
};
const MIN_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (value: string) =>
  EMAIL_REGEX.test(value.trim()) ? "" : ERROR_MSGS.EMAIL;

export const validatePassword = (value: string) =>
  value.length >= MIN_LENGTH ? "" : ERROR_MSGS.PASSWORD;
