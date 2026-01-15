import { all } from "redux-saga/effects";
import { watchAuth } from "./auth/index";

export function* rootSaga() {
  yield all([watchAuth()]);
}
