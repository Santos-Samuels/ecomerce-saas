import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";
import { api } from "@/lib/api";
import { SaveCategoryPayload } from "../../productCategories/types";
import {
  fetchProductCategories,
  setProductCategoriesSlice,
} from "../../productCategories/productCategoriesSlice";

export function* handleSaveProductCategory(
  action: PayloadAction<SaveCategoryPayload>
) {
  try {
    yield put(setProductCategoriesSlice({ saving: true }));

    if (action.payload.id) {
      yield call(
        api.patch,
        `/products/categories/${action.payload.id}`,
        action.payload
      );

      notifications.show({
        title: "Categoria atualizada",
        message: "Categoria de produto atualizada com sucesso.",
        color: "green",
      });
    } else {
      yield call(api.post, "/products/categories", action.payload);

      notifications.show({
        title: "Categoria criada",
        message: "Categoria de produto criada com sucesso.",
        color: "green",
      });
    }

    yield put(
      fetchProductCategories({
        storeId: action.payload.storeId,
      })
    );
  } catch (error: unknown) {
    const typedError = error as {
      response?: { status?: number; data?: { message?: string } };
    };

    const status = typedError.response?.status;
    const message = typedError.response?.data?.message;

    if (
      !action.payload.id &&
      status === 400 &&
      message === "Product category already exists"
    ) {
      notifications.show({
        title: "Categoria já existe",
        message: "Já existe uma categoria com este identificador na sua loja.",
        color: "yellow",
      });
    } else {
      notifications.show({
        title: "Erro ao salvar",
        message: "Não foi possível salvar a categoria. Tente novamente.",
        color: "red",
      });
    }
  } finally {
    yield put(setProductCategoriesSlice({ saving: false }));
  }
}

export function* handleDeleteProductCategory(
  action: PayloadAction<{ id: string; storeId: string }>
) {
  try {
    yield put(
      setProductCategoriesSlice({
        deletingId: action.payload.id,
      })
    );

    yield call(api.delete, `/products/categories/${action.payload.id}`);

    notifications.show({
      title: "Categoria desativada",
      message: "Categoria de produto desativada com sucesso.",
      color: "green",
    });

    yield put(
      fetchProductCategories({
        storeId: action.payload.storeId,
      })
    );
  } catch {
    notifications.show({
      title: "Erro ao desativar",
      message: "Não foi possível desativar a categoria.",
      color: "red",
    });
  } finally {
    yield put(
      setProductCategoriesSlice({
        deletingId: undefined,
      })
    );
  }
}
