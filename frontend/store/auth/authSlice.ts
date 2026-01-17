import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload } from "./types";
import { deleteCookie } from "cookies-next";

const initialState: AuthState = {
  token: null,
  loading: false,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSlice(state, action: PayloadAction<Partial<AuthState>>) {
      Object.assign(state, action.payload);
    },
    login: (_state, _action: PayloadAction<LoginPayload>) => {}, // will be handle by saga
    validateAuth: () => {}, // will be handle by saga
    logout: (state) => {
      state.token = null;
      state.user = undefined;
      deleteCookie("ecomerce-token");
      deleteCookie("ecomerce-store-primary-color");
    },
  },
});

export const { setAuthSlice, login, validateAuth, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
