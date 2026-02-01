import { api } from "@/lib/api";
import { IStoreLayout } from "@ecomerce/shared";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { setStoreLayoutSlice } from "../../storeLayout/storeLayoutSlice";

export function* handleFetchStoreLayout(
  action: PayloadAction<{ storeId?: string } | undefined>,
) {
  try {
    yield put(setStoreLayoutSlice({ loading: true, error: null }));
    const { storeId } = action.payload || {};
    const response: AxiosResponse<IStoreLayout> = yield call(
      api.get,
      `/store-layout?storeId=${storeId}`,
    );
    yield put(setStoreLayoutSlice({ data: response.data, loading: false }));
  } catch (error) {
    const message =
      (error as AxiosError).message || "Failed to fetch store layout";
    yield put(setStoreLayoutSlice({ error: message, loading: false }));
  }
}
