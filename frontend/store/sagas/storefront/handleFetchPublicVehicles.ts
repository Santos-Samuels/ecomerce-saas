import { publicApi } from "@/lib/api";
import {
  fetchPublicVehiclesFailure,
  fetchPublicVehiclesSuccess,
} from "@/store/storefront/storefrontSlice";
import { IVehicle } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { call, put } from "redux-saga/effects";

export function* handleFetchPublicVehicles() {
  try {
    const { data } = yield call(publicApi.get, "/vehicles");
    yield put(fetchPublicVehiclesSuccess(data as IVehicle[]));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Erro ao buscar veículos",
      color: "red",
    });
    yield put(fetchPublicVehiclesFailure());
  }
}
