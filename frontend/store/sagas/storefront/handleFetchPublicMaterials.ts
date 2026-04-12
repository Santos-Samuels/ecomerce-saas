import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { setMaterialSlice } from "@/store/storefront/slices/material.slice";
import { IProductMaterial } from "@ecomerce/shared";

export function* handleFetchPublicMaterials() {
  try {
    const response: { data: IProductMaterial[] } = yield call(api.get, "/products/materials");
    yield put(setMaterialSlice({ items: response.data, loading: false }));
  } catch (error: any) {
    yield put(setMaterialSlice({ error: error.message, loading: false }));
  }
}
