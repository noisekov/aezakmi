import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  login: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  login: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.login = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.login = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
