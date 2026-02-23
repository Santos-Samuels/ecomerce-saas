import { takeLatest } from "redux-saga/effects";
import {
  deleteStaffStore,
  fetchStaffStores,
  saveStaffStore,
} from "@/store/staffStores/staffStoresSlice";
import { handleFetchStaffStores } from "./staffStores.fetch";
import { handleSaveStaffStore } from "./staffStores.save";
import { handleDeleteStaffStore } from "./staffStores.delete";
import {
  activateStaffStore,
  fetchStaffStoreDetails,
} from "@/store/staffStores/staffStoresSlice";
import {
  handleActivateStaffStore,
  handleFetchStaffStoreDetails,
} from "./staffStores.details";

export function* watchStaffStores() {
  yield takeLatest(fetchStaffStores.type, handleFetchStaffStores);
  yield takeLatest(saveStaffStore.type, handleSaveStaffStore);
  yield takeLatest(deleteStaffStore.type, handleDeleteStaffStore);
  yield takeLatest(fetchStaffStoreDetails.type, handleFetchStaffStoreDetails);
  yield takeLatest(activateStaffStore.type, handleActivateStaffStore);
}
