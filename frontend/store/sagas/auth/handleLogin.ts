import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { setAuthSlice } from "../../auth/authSlice";
import { LoginPayload } from "../../auth/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { IStore, IUser } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { deleteCookie, setCookie } from "cookies-next";
import { setStoreSettingsSlice } from "../../storeSettings/storeSettingsSlice";

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

    if (response.data.user.storeId) {
      try {
        const storeResponse: { data: IStore } = yield call(
          api.get,
          `/stores/${response.data.user.storeId}`
        );

        const store = storeResponse.data;

        yield put(
          setStoreSettingsSlice({
            store,
          })
        );

        if (store.primaryColor && store.primaryColor.trim().length > 0) {
          setCookie("ecomerce-store-primary-color", store.primaryColor);
        } else {
          deleteCookie("ecomerce-store-primary-color");
        }
      } catch {
        // Silencia erro de cor/loja para não quebrar fluxo de login
      }
    }
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
