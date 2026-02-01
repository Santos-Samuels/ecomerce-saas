import { publicApi } from "@/lib/api";
import {
    setVehicleSlice,
} from "@/store/storefront/slices/vehicle.slice";
import { IVehicle } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { call, put } from "redux-saga/effects";

export function* handleFetchPublicVehicles() {
  try {
    yield put(setVehicleSlice({ loading: true }));
    const { data } = yield call(publicApi.get, "/vehicles");
    yield put(setVehicleSlice({ items: data as IVehicle[], loading: false }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Erro ao buscar veículos",
      color: "red",
    });
    yield put(setVehicleSlice({ loading: false }));
  }
}
