import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";
import { api } from "@/lib/api";
import { fetchStaffRoles, setStaffRolesSlice } from "@/store/staffRoles/staffRolesSlice";
import { SaveStaffRolePayload } from "@/store/staffRoles/types";

export function* handleSaveStaffRole(
  action: PayloadAction<SaveStaffRolePayload>,
) {
  try {
    yield put(setStaffRolesSlice({ saving: true }));

    if (action.payload.id) {
      yield call(api.patch, `/roles/${action.payload.id}`, {
        name: action.payload.name,
        permissions: action.payload.permissions,
      });

      notifications.show({
        title: "Papel atualizado",
        message: "Papel atualizado com sucesso.",
        color: "green",
      });
    } else {
      yield call(api.post, "/roles", action.payload);

      notifications.show({
        title: "Papel criado",
        message: "Papel criado com sucesso.",
        color: "green",
      });
    }

    yield put(fetchStaffRoles());
  } finally {
    yield put(setStaffRolesSlice({ saving: false }));
  }
}

