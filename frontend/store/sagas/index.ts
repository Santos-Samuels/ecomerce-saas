import { all } from "redux-saga/effects";
import { watchAuth } from "./auth/index";
import { watchProductCategories } from "./productCategories";

export function* rootSaga() {
  yield all([watchAuth(), watchProductCategories()]);
}
