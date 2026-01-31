import { combineReducers } from "@reduxjs/toolkit";
import {
  categoryReducer,
  fetchPublicCategories,
  fetchPublicCategoriesFailure,
  fetchPublicCategoriesSuccess,
} from "./slices/category.slice";
import {
  feedbackReducer,
  fetchStoreFeedbacks,
  fetchStoreFeedbacksFailure,
  fetchStoreFeedbacksSuccess,
} from "./slices/feedback.slice";
import {
  fetchStoreLayout,
  fetchStoreLayoutFailure,
  fetchStoreLayoutSuccess,
  layoutReducer,
} from "./slices/layout.slice";
import {
  fetchPublicProducts,
  fetchPublicProductsFailure,
  fetchPublicProductsSuccess,
  productReducer,
} from "./slices/product.slice";
import {
  fetchCurrentStore,
  fetchCurrentStoreFailure,
  fetchCurrentStoreSuccess,
  storeReducer,
} from "./slices/store.slice";
import {
  fetchPublicVehicles,
  fetchPublicVehiclesFailure,
  fetchPublicVehiclesSuccess,
  vehicleReducer,
} from "./slices/vehicle.slice";

export const storefrontReducer = combineReducers({
  store: storeReducer,
  layout: layoutReducer,
  feedbacks: feedbackReducer,
  products: productReducer,
  categories: categoryReducer,
  vehicles: vehicleReducer,
});

export {
  fetchCurrentStore,
  fetchCurrentStoreFailure,
  fetchCurrentStoreSuccess,
  fetchPublicCategories,
  fetchPublicCategoriesFailure,
  fetchPublicCategoriesSuccess,
  fetchPublicProducts,
  fetchPublicProductsFailure,
  fetchPublicProductsSuccess,
  fetchPublicVehicles,
  fetchPublicVehiclesFailure,
  fetchPublicVehiclesSuccess,
  fetchStoreFeedbacks,
  fetchStoreFeedbacksFailure,
  fetchStoreFeedbacksSuccess,
  fetchStoreLayout,
  fetchStoreLayoutFailure,
  fetchStoreLayoutSuccess,
};
