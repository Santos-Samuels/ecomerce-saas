import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { SaveStaffUserPayload } from "@/store/staffUsers/types";
import { fetchStaffUsers, setStaffUsersSlice } from "@/store/staffUsers/staffUsersSlice";
import { notifications } from "@mantine/notifications";

export function* handleSaveStaffUser(action: PayloadAction<SaveStaffUserPayload>) {
  try {
    yield put(setStaffUsersSlice({ saving: true }));

    const { id, ...data } = action.payload;

    if (id) {
      yield call(api.patch, `/users/${id}`, data);
    } else {
      yield call(api.post, "/users/staff", data);
    }

    notifications.show({
      title: "Sucesso",
      message: `Usuário ${id ? "atualizado" : "criado"} com sucesso`,
      color: "green",
    });

    yield put(fetchStaffUsers());
  } catch (error: any) {
    notifications.show({
      title: "Erro",
      message: error.response?.data?.message || "Erro ao salvar usuário",
      color: "red",
    });
  } finally {
    yield put(setStaffUsersSlice({ saving: false }));
  }
}
