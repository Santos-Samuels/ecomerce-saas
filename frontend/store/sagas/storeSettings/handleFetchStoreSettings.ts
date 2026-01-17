import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { IStore } from "@ecomerce/shared";
import { api } from "@/lib/api";
import { FetchStoreSettingsPayload, SaveStoreSettingsPayload } from "../../storeSettings/types";
import { setStoreSettingsSlice } from "../../storeSettings/storeSettingsSlice";
import { notifications } from "@mantine/notifications";

export function* handleFetchStoreSettings(
  action: PayloadAction<FetchStoreSettingsPayload>
) {
  try {
    yield put(setStoreSettingsSlice({ loading: true }));

    const response: { data: IStore } = yield call(
      api.get,
      `/stores/${action.payload.storeId}`
    );

    yield put(
      setStoreSettingsSlice({
        store: response.data,
      })
    );
  } catch {
    notifications.show({
      title: "Erro ao carregar loja",
      message: "Não foi possível carregar os dados da loja.",
      color: "red",
    });
  } finally {
    yield put(setStoreSettingsSlice({ loading: false }));
  }
}

export function* handleSaveStoreSettings(
  action: PayloadAction<SaveStoreSettingsPayload>
) {
  try {
    yield put(setStoreSettingsSlice({ saving: true }));

    const payload = action.payload;

    const response: { data: IStore } = yield call(
      api.patch,
      `/stores/${payload.id}`,
      payload
    );

    yield put(
      setStoreSettingsSlice({
        store: response.data,
      })
    );

    notifications.show({
      title: "Loja atualizada",
      message: "As informações da loja foram salvas com sucesso.",
      color: "green",
    });
  } catch {
    notifications.show({
      title: "Erro ao salvar",
      message: "Não foi possível salvar as informações da loja.",
      color: "red",
    });
  } finally {
    yield put(setStoreSettingsSlice({ saving: false }));
  }
}

