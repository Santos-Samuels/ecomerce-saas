import {
  fetchCurrentStore,
  fetchPublicCategories,
  fetchPublicMaterials,
  fetchPublicProductBySlug,
  fetchPublicProducts,
  fetchPublicVehicles,
  fetchStoreFeedbacks,
  fetchStoreLayout,
} from "@/store/storefront/storefrontSlice";
import { takeLatest } from "redux-saga/effects";
import { handleFetchCurrentStore } from "./handleFetchCurrentStore";
import { handleFetchPublicCategories } from "./handleFetchPublicCategories";
import { handleFetchPublicMaterials } from "./handleFetchPublicMaterials";
import { handleFetchPublicProductBySlug } from "./handleFetchPublicProductBySlug";
import { handleFetchPublicProducts } from "./handleFetchPublicProducts";
import { handleFetchPublicVehicles } from "./handleFetchPublicVehicles";
import { handleFetchStoreFeedbacks } from "./handleFetchStoreFeedbacks";
import { handleFetchStoreLayout } from "./handleFetchStoreLayout";

export function* watchStorefront() {
  yield takeLatest(fetchPublicProducts.type, handleFetchPublicProducts);
  yield takeLatest(
    fetchPublicProductBySlug.type,
    handleFetchPublicProductBySlug
  );
  yield takeLatest(fetchPublicCategories.type, handleFetchPublicCategories);
  yield takeLatest(fetchPublicVehicles.type, handleFetchPublicVehicles);
  yield takeLatest(fetchPublicMaterials.type, handleFetchPublicMaterials);
  yield takeLatest(fetchCurrentStore.type, handleFetchCurrentStore);
  yield takeLatest(fetchStoreLayout.type, handleFetchStoreLayout);
  yield takeLatest(fetchStoreFeedbacks.type, handleFetchStoreFeedbacks);
}
