import { publicApi } from "@/lib/api";
import {
  setLayoutSlice,
} from "@/store/storefront/slices/layout.slice";
import { IStoreLayout } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { call, put } from "redux-saga/effects";

export function* handleFetchStoreLayout() {
  try {
    yield put(setLayoutSlice({ loading: true }));
    const { data } = yield call(publicApi.get, "/store-layout");
    yield put(setLayoutSlice({ data: data as IStoreLayout, loading: false }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Erro ao buscar layout",
      color: "red",
    });
    yield put(setLayoutSlice({ loading: false }));
  }
}
