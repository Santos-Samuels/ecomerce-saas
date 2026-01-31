import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";
import { api } from "@/lib/api";
import { SaveMaterialPayload } from "../../productMaterials/types";
import {
  fetchProductMaterials,
  setProductMaterialsSlice,
} from "../../productMaterials/productMaterialsSlice";

export function* handleSaveProductMaterial(
  action: PayloadAction<SaveMaterialPayload>
) {
  try {
    yield put(setProductMaterialsSlice({ saving: true }));

    if (action.payload.id) {
      yield call(
        api.patch,
        `/products/materials/${action.payload.id}`,
        action.payload
      );

      notifications.show({
        title: "Material atualizado",
        message: "Material de produto atualizado com sucesso.",
        color: "green",
      });
    } else {
      yield call(api.post, "/products/materials", action.payload);

      notifications.show({
        title: "Material criado",
        message: "Material de produto criado com sucesso.",
        color: "green",
      });
    }

    yield put(
      fetchProductMaterials({
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
      message === "Product material already exists"
    ) {
      notifications.show({
        title: "Material já existe",
        message: "Já existe um material com este nome na sua loja.",
        color: "yellow",
      });
    } else {
      notifications.show({
        title: "Erro ao salvar",
        message: "Não foi possível salvar o material. Tente novamente.",
        color: "red",
      });
    }
  } finally {
    yield put(setProductMaterialsSlice({ saving: false }));
  }
}

export function* handleDeleteProductMaterial(
  action: PayloadAction<{ id: string; storeId: string }>
) {
  try {
    yield put(
      setProductMaterialsSlice({
        deletingId: action.payload.id,
      })
    );

    yield call(api.delete, `/products/materials/${action.payload.id}`);

    notifications.show({
      title: "Material removido",
      message: "Material de produto removido com sucesso.",
      color: "green",
    });

    yield put(
      fetchProductMaterials({
        storeId: action.payload.storeId,
      })
    );
  } catch {
    notifications.show({
      title: "Erro ao remover",
      message: "Não foi possível remover o material.",
      color: "red",
    });
  } finally {
    yield put(
      setProductMaterialsSlice({
        deletingId: undefined,
      })
    );
  }
}

