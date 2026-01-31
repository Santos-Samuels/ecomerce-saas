import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import {
  fetchProducts,
  setProductsSlice,
} from "@/store/products/productsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { SaveProductPayload } from "@/store/products/types";
import { notifications } from "@mantine/notifications";

export function* handleSaveProduct(action: PayloadAction<SaveProductPayload>) {
  try {
    yield put(setProductsSlice({ saving: true }));

    const { id, storeId, onSuccess, ...payload } = action.payload;

    if (id) {
      yield call(api.patch, `/products/${id}`, {
        ...payload,
        storeId,
      });
      notifications.show({
        title: "Sucesso",
        message: "Produto atualizado com sucesso!",
        color: "green",
      });
    } else {
      yield call(api.post, "/products", {
        ...payload,
        storeId,
      });
      notifications.show({
        title: "Sucesso",
        message: "Produto criado com sucesso!",
        color: "green",
      });
    }

    yield put(fetchProducts({ storeId }));

    if (onSuccess) {
      onSuccess();
    }
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível salvar o produto.",
      color: "red",
    });
  } finally {
    yield put(setProductsSlice({ saving: false }));
  }
}
