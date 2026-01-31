import { takeLatest } from "redux-saga/effects";
import {
  deleteProductMaterial,
  fetchProductMaterials,
  saveProductMaterial,
} from "../../productMaterials/productMaterialsSlice";
import { handleFetchProductMaterials } from "./handleFetchProductMaterials";
import {
  handleDeleteProductMaterial,
  handleSaveProductMaterial,
} from "./handleSaveProductMaterial";

export function* watchProductMaterials() {
  yield takeLatest(fetchProductMaterials.type, handleFetchProductMaterials);
  yield takeLatest(saveProductMaterial.type, handleSaveProductMaterial);
  yield takeLatest(deleteProductMaterial.type, handleDeleteProductMaterial);
}

