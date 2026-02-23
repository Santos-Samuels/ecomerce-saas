import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";
import { api } from "@/lib/api";
import { fetchStaffRoles, setStaffRolesSlice } from "@/store/staffRoles/staffRolesSlice";
import { DeleteStaffRolePayload } from "@/store/staffRoles/types";

export function* handleDeleteStaffRole(
  action: PayloadAction<DeleteStaffRolePayload>,
) {
  try {
    yield put(setStaffRolesSlice({ deletingId: action.payload.id }));

    yield call(api.delete, `/roles/${action.payload.id}`);

    notifications.show({
      title: "Papel removido",
      message: "Papel removido com sucesso.",
      color: "green",
    });

    yield put(fetchStaffRoles());
  } finally {
    yield put(setStaffRolesSlice({ deletingId: undefined }));
  }
}

