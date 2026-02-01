import { publicApi } from "@/lib/api";
import {
    setFeedbackSlice,
} from "@/store/storefront/slices/feedback.slice";
import { IStoreFeedback } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { call, put } from "redux-saga/effects";

export function* handleFetchStoreFeedbacks() {
  try {
    yield put(setFeedbackSlice({ loading: true }));
    const { data } = yield call(publicApi.get, "/store/feedbacks");
    yield put(setFeedbackSlice({ items: data as IStoreFeedback[], loading: false }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Erro ao buscar feedbacks",
      color: "red",
    });
    yield put(setFeedbackSlice({ loading: false }));
  }
}
