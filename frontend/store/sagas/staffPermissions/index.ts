import { takeLatest } from "redux-saga/effects";
import {
  deleteStaffPermission,
  fetchStaffPermissions,
  saveStaffPermission,
} from "@/store/staffPermissions/staffPermissionsSlice";
import { handleFetchStaffPermissions } from "./staffPermissions.fetch";
import { handleSaveStaffPermission } from "./staffPermissions.save";
import { handleDeleteStaffPermission } from "./staffPermissions.delete";

export function* watchStaffPermissions() {
  yield takeLatest(fetchStaffPermissions.type, handleFetchStaffPermissions);
  yield takeLatest(saveStaffPermission.type, handleSaveStaffPermission);
  yield takeLatest(deleteStaffPermission.type, handleDeleteStaffPermission);
}

