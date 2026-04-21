import { api } from "@/lib/api";
import { fetchGallery, setGallerySlice } from "@/store/gallery/gallerySlice";
import { DeleteGalleryPayload } from "@/store/gallery/types";
import { notifications } from "@mantine/notifications";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";

export function* handleDeleteGallery(
  action: PayloadAction<DeleteGalleryPayload>,
) {
  try {
    yield put(setGallerySlice({ deletingId: action.payload.id }));

    yield call(api.delete, `/gallery/${action.payload.id}`);

    notifications.show({
      title: "Sucesso",
      message: "Imagem removida da galeria.",
      color: "green",
    });

    yield put(fetchGallery({ storeId: action.payload.storeId }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível remover a imagem.",
      color: "red",
    });
  } finally {
    yield put(setGallerySlice({ deletingId: undefined }));
  }
}
