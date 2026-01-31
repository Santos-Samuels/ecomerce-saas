import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { IProductMaterial } from "@ecomerce/shared";
import { api } from "@/lib/api";
import { setProductMaterialsSlice } from "../../productMaterials/productMaterialsSlice";

export function* handleFetchProductMaterials(
  action: PayloadAction<{ storeId: string }>
) {
  try {
    yield put(setProductMaterialsSlice({ loading: true }));

    const response: { data: IProductMaterial[] } = yield call(
      api.get,
      "/products/materials",
      {
        params: { storeId: action.payload.storeId },
      }
    );

    yield put(
      setProductMaterialsSlice({
        items: response.data,
      })
    );
  } finally {
    yield put(setProductMaterialsSlice({ loading: false }));
  }
}

