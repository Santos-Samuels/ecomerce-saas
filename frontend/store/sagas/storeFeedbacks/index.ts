import { takeLatest } from "redux-saga/effects";
import {
  fetchStoreFeedbacks,
  saveStoreFeedback,
  deleteStoreFeedback,
} from "../../storeFeedbacks/storeFeedbacksSlice";
import { handleFetchStoreFeedbacks } from "./handleFetchStoreFeedbacks";
import { handleSaveStoreFeedback } from "./handleSaveStoreFeedback";
import { handleDeleteStoreFeedback } from "./handleDeleteStoreFeedback";

export function* watchStoreFeedbacks() {
  yield takeLatest(fetchStoreFeedbacks.type, handleFetchStoreFeedbacks);
  yield takeLatest(saveStoreFeedback.type, handleSaveStoreFeedback);
  yield takeLatest(deleteStoreFeedback.type, handleDeleteStoreFeedback);
}
