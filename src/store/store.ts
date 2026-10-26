import { configureStore } from "@reduxjs/toolkit";
import authReducer, { type AuthState } from "./authSlice";

const getInitialAuthState = (): AuthState => {
  const login =
    typeof localStorage !== "undefined" ? localStorage.getItem("login") : null;

  return {
    isAuthenticated: Boolean(login),
    login,
  };
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: getInitialAuthState(),
  },
});

store.subscribe(() => {
  const login = store.getState().auth.login;

  if (login) {
    localStorage.setItem("login", login);
  } else {
    localStorage.removeItem("login");
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
