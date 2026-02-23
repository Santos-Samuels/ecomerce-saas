import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";
import { api } from "@/lib/api";
import { fetchStaffStores, setStaffStoresSlice } from "@/store/staffStores/staffStoresSlice";
import { DeleteStaffStorePayload } from "@/store/staffStores/types";

export function* handleDeleteStaffStore(
  action: PayloadAction<DeleteStaffStorePayload>,
) {
  try {
    yield put(setStaffStoresSlice({ deletingId: action.payload.id }));

    yield call(api.delete, `/stores/${action.payload.id}`);

    notifications.show({
      title: "Loja desativada",
      message: "Loja desativada com sucesso.",
      color: "green",
    });

    yield put(fetchStaffStores());
  } finally {
    yield put(setStaffStoresSlice({ deletingId: undefined }));
  }
}
