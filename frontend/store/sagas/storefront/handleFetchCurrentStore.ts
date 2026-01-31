import { publicApi } from "@/lib/api";
import {
  fetchCurrentStoreFailure,
  fetchCurrentStoreSuccess,
} from "@/store/storefront/storefrontSlice";
import { IStore } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { call, put } from "redux-saga/effects";
import { AxiosError } from "axios";

export function* handleFetchCurrentStore() {
  try {
    const { data } = yield call(publicApi.get, "/stores/current");
    yield put(fetchCurrentStoreSuccess(data as IStore));
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      yield put(fetchCurrentStoreFailure(true));
    } else {
      notifications.show({
        title: "Erro",
        message: "Não foi possível carregar a loja.",
        color: "red",
      });
      yield put(fetchCurrentStoreFailure(false));
    }
  }
}
