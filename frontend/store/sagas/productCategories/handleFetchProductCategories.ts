import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { IProductCategory } from "@ecomerce/shared";
import { setProductCategoriesSlice } from "../../productCategories/productCategoriesSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export function* handleFetchProductCategories(
  action: PayloadAction<{ storeId: string }>
) {
  try {
    yield put(setProductCategoriesSlice({ loading: true }));

    const response: { data: IProductCategory[] } = yield call(
      api.get,
      "/products/categories",
      {
        params: { storeId: action.payload.storeId },
      }
    );

    yield put(
      setProductCategoriesSlice({
        items: response.data,
      })
    );
  } finally {
    yield put(setProductCategoriesSlice({ loading: false }));
  }
}
