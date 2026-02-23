import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";
import { api } from "@/lib/api";
import { fetchStaffPermissions, setStaffPermissionsSlice } from "@/store/staffPermissions/staffPermissionsSlice";
import { DeleteStaffPermissionPayload } from "@/store/staffPermissions/types";

export function* handleDeleteStaffPermission(
  action: PayloadAction<DeleteStaffPermissionPayload>,
) {
  try {
    yield put(setStaffPermissionsSlice({ deletingId: action.payload.id }));

    yield call(api.delete, `/permissions/${action.payload.id}`);

    notifications.show({
      title: "Permissão removida",
      message: "Permissão removida com sucesso.",
      color: "green",
    });

    yield put(fetchStaffPermissions());
  } finally {
    yield put(setStaffPermissionsSlice({ deletingId: undefined }));
  }
}
