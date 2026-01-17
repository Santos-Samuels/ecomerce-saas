import { all } from "redux-saga/effects";
import { watchAuth } from "./auth/index";
import { watchProductCategories } from "./productCategories";
import { watchProductMaterials } from "./productMaterials";
import { watchProducts } from "./products";
import { watchStoreSettings } from "./storeSettings";
import { watchVehicles } from "./vehicles";

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchProductCategories(),
    watchProductMaterials(),
    watchProducts(),
    watchVehicles(),
    watchStoreSettings(),
  ]);
}
