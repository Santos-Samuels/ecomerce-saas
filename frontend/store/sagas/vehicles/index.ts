import { takeLatest } from "redux-saga/effects";
import {
  deleteVehicle,
  fetchVehicles,
  saveVehicle,
} from "@/store/vehicles/vehiclesSlice";
import { handleFetchVehicles } from "./handleFetchVehicles";
import { handleSaveVehicle } from "./handleSaveVehicle";
import { handleDeleteVehicle } from "./handleDeleteVehicle";

export function* watchVehicles() {
  yield takeLatest(fetchVehicles.type, handleFetchVehicles);
  yield takeLatest(saveVehicle.type, handleSaveVehicle);
  yield takeLatest(deleteVehicle.type, handleDeleteVehicle);
}
