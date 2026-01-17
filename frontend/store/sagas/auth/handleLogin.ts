import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { setAuthSlice } from "../../auth/authSlice";
import { LoginPayload } from "../../auth/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { setCookie } from "cookies-next";

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

    setCookie("ecomerce-token", response.data.accessToken);

    yield put(
      setAuthSlice({
        token: response.data.accessToken,
        user: response.data.user,
      })
    );
  } catch {
    notifications.show({
      title: "Erro ao entrar",
      message: "Verifique seu email e senha e tente novamente.",
      color: "red",
    });
  } finally {
    yield put(setAuthSlice({ loading: false }));
  }
}
