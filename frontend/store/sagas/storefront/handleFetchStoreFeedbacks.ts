import { publicApi } from "@/lib/api";
import {
    fetchStoreFeedbacksFailure,
    fetchStoreFeedbacksSuccess,
} from "@/store/storefront/storefrontSlice";
import { IStoreFeedback } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { call, put } from "redux-saga/effects";

export function* handleFetchStoreFeedbacks() {
  try {
    const { data } = yield call(publicApi.get, "/store/feedbacks");
    yield put(fetchStoreFeedbacksSuccess(data as IStoreFeedback[]));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Erro ao buscar feedbacks",
      color: "red",
    });
    yield put(fetchStoreFeedbacksFailure());
  }
}
