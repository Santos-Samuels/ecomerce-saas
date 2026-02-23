import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import {
  FetchStaffStoreDetailsPayload,
  ActivateStaffStorePayload,
} from "@/store/staffStores/types";
import { setStaffStoresSlice } from "@/store/staffStores/staffStoresSlice";
import { notifications } from "@mantine/notifications";

export function* handleFetchStaffStoreDetails(
  action: PayloadAction<FetchStaffStoreDetailsPayload>,
) {
  try {
    yield put(setStaffStoresSlice({ currentLoading: true }));
    const response: { data: any } = yield call(
      api.get,
      `/stores/${action.payload.id}`,
    );
    yield put(
      setStaffStoresSlice({ current: response.data, currentLoading: false }),
    );
  } catch {
    yield put(setStaffStoresSlice({ current: null, currentLoading: false }));
  }
}

export function* handleActivateStaffStore(
  action: PayloadAction<ActivateStaffStorePayload>,
) {
  try {
    yield call(api.patch, `/stores/${action.payload.id}/activate`);
    notifications.show({
      title: "Loja ativada",
      message: "A loja foi ativada com sucesso.",
      color: "green",
    });
  } catch {
    notifications.show({
      title: "Erro",
      message: "Não foi possível ativar a loja.",
      color: "red",
    });
  }
}

