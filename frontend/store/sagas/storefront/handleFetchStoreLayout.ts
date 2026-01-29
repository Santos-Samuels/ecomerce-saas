import { publicApi } from "@/lib/api";
import {
    fetchStoreLayoutFailure,
    fetchStoreLayoutSuccess,
} from "@/store/storefront/storefrontSlice";
import { IStoreLayout } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { call, put } from "redux-saga/effects";

export function* handleFetchStoreLayout() {
  try {
    const { data } = yield call(publicApi.get, "/store-layout");
    yield put(fetchStoreLayoutSuccess(data as IStoreLayout));
  } catch (_error) {
    // Layout is optional, but we notify if it fails (unless 404?)
    // User requested notifications, so we show it.
    notifications.show({
      title: "Erro",
      message: "Erro ao buscar layout",
      color: "red",
    });
    yield put(fetchStoreLayoutFailure());
  }
}
