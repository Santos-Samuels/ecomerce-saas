import { publicApi } from "@/lib/api";
import {
  setProductSlice,
} from "@/store/storefront/slices/product.slice";
import { FilterProductDto } from "@/store/storefront/types";
import { IProduct } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";

export function* handleFetchPublicProducts(
  action: PayloadAction<FilterProductDto | undefined>
) {
  try {
    yield put(setProductSlice({ loading: true }));
    const filters = action.payload;
    const { data } = yield call(publicApi.get, "/products", {
      params: filters,
    });

    yield put(setProductSlice({ items: data as IProduct[], loading: false }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Erro ao buscar produtos",
      color: "red",
    });
    yield put(setProductSlice({ loading: false }));
  }
}
