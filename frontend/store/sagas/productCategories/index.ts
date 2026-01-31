import { takeLatest } from "redux-saga/effects";
import {
  deleteProductCategory,
  fetchProductCategories,
  saveProductCategory,
} from "../../productCategories/productCategoriesSlice";
import { handleFetchProductCategories } from "./handleFetchProductCategories";
import {
  handleDeleteProductCategory,
  handleSaveProductCategory,
} from "./handleSaveProductCategory";

export function* watchProductCategories() {
  yield takeLatest(fetchProductCategories.type, handleFetchProductCategories);
  yield takeLatest(saveProductCategory.type, handleSaveProductCategory);
  yield takeLatest(deleteProductCategory.type, handleDeleteProductCategory);
}

