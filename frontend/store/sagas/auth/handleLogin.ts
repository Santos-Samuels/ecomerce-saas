import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { setAuthSlice } from "../../auth/authSlice";
import { LoginPayload } from "../../auth/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";

interface LoginResponse {
  accessToken: string;
  user: IUser;
}

export function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    yield put(setAuthSlice({ loading: true }));

    const response: { data: LoginResponse } = yield call(
      api.post,
      "/auth/login",
      action.payload
    );

    yield put(
      setAuthSlice({
        token: response.data.accessToken,
        user: response.data.user,
        loading: false,
      })
    );
  } catch {
    notifications.show({
      title: "Erro de autenticação",
      message: "Verifique seu email e senha e tente novamente.",
      color: "red",
    });
  }
}
