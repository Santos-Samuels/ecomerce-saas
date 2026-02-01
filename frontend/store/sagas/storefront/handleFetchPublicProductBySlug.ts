import { publicApi } from "@/lib/api";
import {
  setProductSlice,
} from "@/store/storefront/slices/product.slice";
import { IProduct } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";

export function* handleFetchPublicProductBySlug(
  action: PayloadAction<string>
) {
  try {
    yield put(setProductSlice({ loading: true, currentProduct: null, notFound: false }));
    const slug = action.payload;
    const { data } = yield call(publicApi.get, `/products/slug/${slug}`);

    yield put(setProductSlice({ currentProduct: data as IProduct, loading: false, notFound: false }));
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
        yield put(setProductSlice({ loading: false, currentProduct: null, notFound: true }));
    } else {
        notifications.show({
        title: "Erro",
        message: "Erro ao buscar produto",
        color: "red",
        });
        yield put(setProductSlice({ loading: false, currentProduct: null, notFound: false }));
    }
  }
}
