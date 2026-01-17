import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { setVehiclesSlice } from "../../vehicles/vehiclesSlice";
import { notifications } from "@mantine/notifications";

export function* handleFetchVehicles() {
  try {
    yield put(setVehiclesSlice({ loading: true }));

    const { data } = yield call(api.get, "/vehicles");

    yield put(setVehiclesSlice({ items: data }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível carregar os veículos.",
      color: "red",
    });
  } finally {
    yield put(setVehiclesSlice({ loading: false }));
  }
}
