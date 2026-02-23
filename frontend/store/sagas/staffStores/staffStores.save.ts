import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";
import { api } from "@/lib/api";
import { fetchStaffStores, setStaffStoresSlice } from "@/store/staffStores/staffStoresSlice";
import { SaveStaffStorePayload } from "@/store/staffStores/types";

export function* handleSaveStaffStore(
  action: PayloadAction<SaveStaffStorePayload>,
) {
  try {
    yield put(setStaffStoresSlice({ saving: true }));

    if (action.payload.id) {
      yield call(api.patch, `/stores/${action.payload.id}`, action.payload);

      notifications.show({
        title: "Loja atualizada",
        message: "Loja atualizada com sucesso.",
        color: "green",
      });
    } else {
      yield call(api.post, "/stores", action.payload);

      notifications.show({
        title: "Loja criada",
        message: "Loja criada com sucesso.",
        color: "green",
      });
    }

    yield put(fetchStaffStores());
  } finally {
    yield put(setStaffStoresSlice({ saving: false }));
  }
}
