export const validateUser = (
  login: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
) => {
  return login === "admin" && password === "admin";
};
