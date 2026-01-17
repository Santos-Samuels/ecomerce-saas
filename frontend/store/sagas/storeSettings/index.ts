import { takeLatest } from "redux-saga/effects";
import {
  fetchStoreSettings,
  saveStoreSettings,
} from "../../storeSettings/storeSettingsSlice";
import {
  handleFetchStoreSettings,
  handleSaveStoreSettings,
} from "./handleFetchStoreSettings";

export function* watchStoreSettings() {
  yield takeLatest(fetchStoreSettings.type, handleFetchStoreSettings);
  yield takeLatest(saveStoreSettings.type, handleSaveStoreSettings);
}

