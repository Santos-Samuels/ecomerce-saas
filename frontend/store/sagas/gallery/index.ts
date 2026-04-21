import { takeLatest } from "redux-saga/effects";
import {
  deleteGallery,
  fetchGallery,
  saveGalleryBatch,
} from "../../gallery/gallerySlice";
import { handleDeleteGallery } from "./handleDeleteGallery";
import { handleFetchGallery } from "./handleFetchGallery";
import { handleSaveGalleryBatch } from "./handleSaveGalleryBatch";

export function* watchGallery() {
  yield takeLatest(fetchGallery.type, handleFetchGallery);
  yield takeLatest(saveGalleryBatch.type, handleSaveGalleryBatch);
  yield takeLatest(deleteGallery.type, handleDeleteGallery);
}
