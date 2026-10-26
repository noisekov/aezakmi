import type { RootState } from "./store";

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectLogin = (state: RootState) => state.auth.login;
