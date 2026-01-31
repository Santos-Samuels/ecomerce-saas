import { publicApi } from "@/lib/api";
import {
  fetchPublicProductsFailure,
  fetchPublicProductsSuccess,
} from "@/store/storefront/storefrontSlice";
import { FilterProductDto } from "@/store/storefront/types";
import { IProduct } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";

export function* handleFetchPublicProducts(
  action: PayloadAction<FilterProductDto | undefined>
) {
  try {
    const filters = action.payload;
    const { data } = yield call(publicApi.get, "/products", {
      params: filters,
    });

    yield put(fetchPublicProductsSuccess(data as IProduct[]));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Erro ao buscar produtos",
      color: "red",
    });
    yield put(fetchPublicProductsFailure());
  }
}
