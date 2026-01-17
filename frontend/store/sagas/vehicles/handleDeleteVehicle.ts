import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import {
  fetchVehicles,
  setVehiclesSlice,
} from "@/store/vehicles/vehiclesSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { DeleteVehiclePayload } from "@/store/vehicles/types";
import { notifications } from "@mantine/notifications";

export function* handleDeleteVehicle(
  action: PayloadAction<DeleteVehiclePayload>
) {
  try {
    yield put(setVehiclesSlice({ deletingId: action.payload.id }));

    yield call(api.delete, `/vehicles/${action.payload.id}`);

    notifications.show({
      title: "Sucesso",
      message: "Veículo removido com sucesso!",
      color: "green",
    });

    yield put(fetchVehicles());
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível remover o veículo.",
      color: "red",
    });
  } finally {
    yield put(setVehiclesSlice({ deletingId: undefined }));
  }
}
