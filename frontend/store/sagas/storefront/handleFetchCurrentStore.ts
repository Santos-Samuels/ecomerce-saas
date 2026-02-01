import { publicApi } from "@/lib/api";
import {
    setStoreSlice,
} from "@/store/storefront/slices/store.slice";
import { IStore } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { call, put } from "redux-saga/effects";

export function* handleFetchCurrentStore() {
  try {
    yield put(setStoreSlice({ loading: true, notFound: false }));
    const { data } = yield call(publicApi.get, "/stores/current");
    yield put(setStoreSlice({ data: data as IStore, loading: false, notFound: false }));
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      yield put(setStoreSlice({ notFound: true, loading: false }));
    } else {
      notifications.show({
        title: "Erro",
        message: "Não foi possível carregar a loja.",
        color: "red",
      });
      yield put(setStoreSlice({ notFound: false, loading: false }));
    }
  }
}
