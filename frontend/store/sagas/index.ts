import { all } from "redux-saga/effects";
import { watchAuth } from "./auth";
import { watchProductCategories } from "./productCategories";
import { watchProductMaterials } from "./productMaterials";
import { watchProducts } from "./products";
import { watchVehicles } from "./vehicles";
import { watchStoreSettings } from "./storeSettings";
import { watchStoreFeedbacks } from "./storeFeedbacks";
import { watchStoreLayout } from "./storeLayout";
import { watchStorefront } from "./storefront";
import { watchStaffPermissions } from "./staffPermissions";
import { watchStaffStores } from "./staffStores";
import { watchStaffRoles } from "./staffRoles";

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchProductCategories(),
    watchProductMaterials(),
    watchProducts(),
    watchVehicles(),
    watchStoreSettings(),
    watchStoreFeedbacks(),
    watchStoreLayout(),
    watchStorefront(),
    watchStaffPermissions(),
    watchStaffStores(),
    watchStaffRoles(),
  ]);
}
