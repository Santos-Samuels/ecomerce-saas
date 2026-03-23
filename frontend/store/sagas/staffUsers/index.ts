import { takeLatest } from "redux-saga/effects";
import {
  deleteStaffUser,
  fetchStaffUsers,
  saveStaffUser,
} from "@/store/staffUsers/staffUsersSlice";
import { handleFetchStaffUsers } from "./staffUsers.fetch";
import { handleSaveStaffUser } from "./staffUsers.save";
import { handleDeleteStaffUser } from "./staffUsers.delete";

export function* watchStaffUsers() {
  yield takeLatest(fetchStaffUsers.type, handleFetchStaffUsers);
  yield takeLatest(saveStaffUser.type, handleSaveStaffUser);
  yield takeLatest(deleteStaffUser.type, handleDeleteStaffUser);
}
