import { takeLatest } from "redux-saga/effects";
import {
  deleteStaffRole,
  fetchStaffRoles,
  saveStaffRole,
} from "@/store/staffRoles/staffRolesSlice";
import { handleFetchStaffRoles } from "./roles.fetch";
import { handleSaveStaffRole } from "./roles.save";
import { handleDeleteStaffRole } from "./roles.delete";

export function* watchStaffRoles() {
  yield takeLatest(fetchStaffRoles.type, handleFetchStaffRoles);
  yield takeLatest(saveStaffRole.type, handleSaveStaffRole);
  yield takeLatest(deleteStaffRole.type, handleDeleteStaffRole);
}

