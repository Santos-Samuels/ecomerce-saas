import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import {
  fetchProducts,
  setProductsSlice,
} from "@/store/products/productsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { DeleteProductPayload } from "@/store/products/types";
import { notifications } from "@mantine/notifications";

export function* handleDeleteProduct(
  action: PayloadAction<DeleteProductPayload>
) {
  try {
    yield put(setProductsSlice({ deletingId: action.payload.id }));

    yield call(api.delete, `/products/${action.payload.id}`);
    
    notifications.show({
      title: "Sucesso",
      message: "Produto removido com sucesso!",
      color: "green",
    });

    yield put(fetchProducts({ storeId: action.payload.storeId }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível remover o produto.",
      color: "red",
    });
  } finally {
    yield put(setProductsSlice({ deletingId: undefined }));
  }
}
