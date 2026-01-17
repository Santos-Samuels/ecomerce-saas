import { all } from "redux-saga/effects";
import { watchAuth } from "./auth/index";
import { watchProductCategories } from "./productCategories";
import { watchProductMaterials } from "./productMaterials";
import { watchStoreSettings } from "./storeSettings";

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchProductCategories(),
    watchProductMaterials(),
    watchStoreSettings(),
  ]);
}
