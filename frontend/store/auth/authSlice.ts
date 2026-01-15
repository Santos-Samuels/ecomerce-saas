import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload } from "./types";

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
  },
});

export const { setAuthSlice, login } = authSlice.actions;

export const authReducer = authSlice.reducer;
