import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";
import { api } from "@/lib/api";
import { fetchStaffPermissions, setStaffPermissionsSlice } from "@/store/staffPermissions/staffPermissionsSlice";
import { SaveStaffPermissionPayload } from "@/store/staffPermissions/types";

export function* handleSaveStaffPermission(
  action: PayloadAction<SaveStaffPermissionPayload>,
) {
  try {
    yield put(setStaffPermissionsSlice({ saving: true }));

    if (action.payload.id) {
      yield call(api.patch, `/permissions/${action.payload.id}`, {
        name: action.payload.name,
        description: action.payload.description,
      });

      notifications.show({
        title: "Permissão atualizada",
        message: "Permissão atualizada com sucesso.",
        color: "green",
      });
    } else {
      yield call(api.post, "/permissions", action.payload);

      notifications.show({
        title: "Permissão criada",
        message: "Permissão criada com sucesso.",
        color: "green",
      });
    }

    yield put(fetchStaffPermissions());
  } finally {
    yield put(setStaffPermissionsSlice({ saving: false }));
  }
}
