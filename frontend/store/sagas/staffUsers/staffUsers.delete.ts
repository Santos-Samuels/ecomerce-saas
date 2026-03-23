import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { DeleteStaffUserPayload } from "@/store/staffUsers/types";
import { fetchStaffUsers, setStaffUsersSlice } from "@/store/staffUsers/staffUsersSlice";
import { notifications } from "@mantine/notifications";

export function* handleDeleteStaffUser(action: PayloadAction<DeleteStaffUserPayload>) {
  try {
    yield put(setStaffUsersSlice({ deletingId: action.payload.id }));

    yield call(api.delete, `/users/${action.payload.id}`);

    notifications.show({
      title: "Sucesso",
      message: "Usuário excluído com sucesso",
      color: "green",
    });

    yield put(fetchStaffUsers());
  } catch (error: any) {
    notifications.show({
      title: "Erro",
      message: error.response?.data?.message || "Erro ao excluir usuário",
      color: "red",
    });
  } finally {
    yield put(setStaffUsersSlice({ deletingId: undefined }));
  }
}
