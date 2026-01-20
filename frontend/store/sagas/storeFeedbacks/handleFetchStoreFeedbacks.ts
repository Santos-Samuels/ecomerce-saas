import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { setStoreFeedbacksSlice } from "../../storeFeedbacks/storeFeedbacksSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { FetchStoreFeedbacksPayload } from "../../storeFeedbacks/types";
import { notifications } from "@mantine/notifications";

export function* handleFetchStoreFeedbacks(
  action: PayloadAction<FetchStoreFeedbacksPayload>
) {
  try {
    yield put(setStoreFeedbacksSlice({ loading: true }));

    const { data } = yield call(api.get, "/store/feedbacks", {
      params: { storeId: action.payload.storeId },
    });

    yield put(setStoreFeedbacksSlice({ items: data }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível carregar os feedbacks.",
      color: "red",
    });
  } finally {
    yield put(setStoreFeedbacksSlice({ loading: false }));
  }
}
