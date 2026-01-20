import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import {
  fetchStoreFeedbacks,
  setStoreFeedbacksSlice,
} from "../../storeFeedbacks/storeFeedbacksSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { SaveStoreFeedbackPayload } from "../../storeFeedbacks/types";
import { notifications } from "@mantine/notifications";

export function* handleSaveStoreFeedback(
  action: PayloadAction<SaveStoreFeedbackPayload>
) {
  try {
    yield put(setStoreFeedbacksSlice({ saving: true }));

    const { id, storeId, onSuccess, ...payload } = action.payload;

    if (id) {
      yield call(api.patch, `/store/feedbacks/${id}`, payload);
      notifications.show({
        title: "Sucesso",
        message: "Feedback atualizado com sucesso!",
        color: "green",
      });
    } else {
      yield call(api.post, "/store/feedbacks", {
        ...payload,
        storeId,
      });
      notifications.show({
        title: "Sucesso",
        message: "Feedback criado com sucesso!",
        color: "green",
      });
    }

    yield put(fetchStoreFeedbacks({ storeId }));

    if (onSuccess) {
      onSuccess();
    }
  } catch (error: unknown) {
    const typedError = error as {
      response?: { status?: number; data?: { message?: string } };
    };
    
    const message = typedError.response?.data?.message;
    
    notifications.show({
      title: "Erro",
      message: message || "Não foi possível salvar o feedback.",
      color: "red",
    });
  } finally {
    yield put(setStoreFeedbacksSlice({ saving: false }));
  }
}
