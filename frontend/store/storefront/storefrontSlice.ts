import { combineReducers } from "@reduxjs/toolkit";
import {
    categoryReducer,
    fetchPublicCategories,
    setCategorySlice
} from "./slices/category.slice";
import {
    feedbackReducer,
    fetchStoreFeedbacks,
    setFeedbackSlice
} from "./slices/feedback.slice";
import {
    fetchStoreLayout,
    layoutReducer,
    setLayoutSlice
} from "./slices/layout.slice";
import {
    fetchPublicProductBySlug,
    fetchPublicProducts,
    productReducer,
    setProductSlice
} from "./slices/product.slice";
import {
    fetchCurrentStore,
    setStoreSlice,
    storeReducer
} from "./slices/store.slice";
import {
    fetchPublicVehicles,
    setVehicleSlice,
    vehicleReducer
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
    fetchCurrentStore, fetchPublicCategories, fetchPublicProductBySlug, fetchPublicProducts,
    fetchPublicVehicles, fetchStoreFeedbacks, fetchStoreLayout, setCategorySlice, setFeedbackSlice, setLayoutSlice, setProductSlice, setStoreSlice, setVehicleSlice
};

