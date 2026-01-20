import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import {
  fetchStoreFeedbacks,
  setStoreFeedbacksSlice,
} from "../../storeFeedbacks/storeFeedbacksSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { DeleteStoreFeedbackPayload } from "../../storeFeedbacks/types";
import { notifications } from "@mantine/notifications";

export function* handleDeleteStoreFeedback(
  action: PayloadAction<DeleteStoreFeedbackPayload>
) {
  try {
    yield put(setStoreFeedbacksSlice({ deletingId: action.payload.id }));

    yield call(api.delete, `/store/feedbacks/${action.payload.id}`);

    notifications.show({
      title: "Sucesso",
      message: "Feedback removido com sucesso!",
      color: "green",
    });

    yield put(fetchStoreFeedbacks({ storeId: action.payload.storeId }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível remover o feedback.",
      color: "red",
    });
  } finally {
    yield put(setStoreFeedbacksSlice({ deletingId: undefined }));
  }
}
