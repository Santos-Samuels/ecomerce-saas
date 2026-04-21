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
    fetchPublicMaterials,
    materialReducer,
    setMaterialSlice
} from "./slices/material.slice";
import {
    fetchPublicGallery,
    setStorefrontGallerySlice,
    storefrontGalleryReducer
} from "./slices/gallery.slice";
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
  gallery: storefrontGalleryReducer,
  products: productReducer,
  categories: categoryReducer,
  vehicles: vehicleReducer,
  materials: materialReducer,
});

export {
    fetchCurrentStore, fetchPublicCategories, fetchPublicGallery, fetchPublicMaterials, fetchPublicProductBySlug, fetchPublicProducts,
    fetchPublicVehicles, fetchStoreFeedbacks, fetchStoreLayout, setCategorySlice, setFeedbackSlice, setLayoutSlice, setMaterialSlice, setProductSlice, setStoreSlice, setStorefrontGallerySlice, setVehicleSlice
};

