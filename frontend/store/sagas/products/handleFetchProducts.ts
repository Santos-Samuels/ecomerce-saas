import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { setProductsSlice } from "@/store/products/productsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";

export function* handleFetchProducts(
  action: PayloadAction<{ storeId: string }>
) {
  try {
    yield put(setProductsSlice({ loading: true }));

    const { storeId } = action.payload;
    const { data } = yield call(api.get, "/products", {
      params: { storeId },
    });

    yield put(setProductsSlice({ items: data }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível carregar os produtos.",
      color: "red",
    });
  } finally {
    yield put(setProductsSlice({ loading: false }));
  }
}
