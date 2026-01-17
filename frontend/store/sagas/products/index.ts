import { takeLatest } from "redux-saga/effects";
import {
  deleteProduct,
  fetchProducts,
  saveProduct,
} from "@/store/products/productsSlice";
import { handleFetchProducts } from "./handleFetchProducts";
import { handleSaveProduct } from "./handleSaveProduct";
import { handleDeleteProduct } from "./handleDeleteProduct";

export function* watchProducts() {
  yield takeLatest(fetchProducts.type, handleFetchProducts);
  yield takeLatest(saveProduct.type, handleSaveProduct);
  yield takeLatest(deleteProduct.type, handleDeleteProduct);
}
