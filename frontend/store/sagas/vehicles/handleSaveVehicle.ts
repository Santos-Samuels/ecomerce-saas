import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import {
  fetchVehicles,
  setVehiclesSlice,
} from "@/store/vehicles/vehiclesSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { SaveVehiclePayload } from "@/store/vehicles/types";
import { notifications } from "@mantine/notifications";

export function* handleSaveVehicle(action: PayloadAction<SaveVehiclePayload>) {
  try {
    yield put(setVehiclesSlice({ saving: true }));

    const { id, onSuccess, ...payload } = action.payload;

    if (id) {
      yield call(api.patch, `/vehicles/${id}`, payload);
      notifications.show({
        title: "Sucesso",
        message: "Veículo atualizado com sucesso!",
        color: "green",
      });
    } else {
      yield call(api.post, "/vehicles", payload);
      notifications.show({
        title: "Sucesso",
        message: "Veículo criado com sucesso!",
        color: "green",
      });
    }

    yield put(fetchVehicles());

    if (onSuccess) {
      onSuccess();
    }
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível salvar o veículo.",
      color: "red",
    });
  } finally {
    yield put(setVehiclesSlice({ saving: false }));
  }
}
