import { api } from "@/lib/api";
import {
  fetchGallery,
  setGallerySlice,
} from "@/store/gallery/gallerySlice";
import { SaveGalleryBatchPayload } from "@/store/gallery/types";
import { notifications } from "@mantine/notifications";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";

export function* handleSaveGalleryBatch(
  action: PayloadAction<SaveGalleryBatchPayload>,
) {
  const { storeId, urls, onSuccess } = action.payload;
  try {
    yield put(setGallerySlice({ uploading: true }));

    yield call(api.post, "/gallery/batch", { urls });

    notifications.show({
      title: "Sucesso",
      message:
        urls.length === 1
          ? "Imagem adicionada à galeria."
          : `${urls.length} imagens adicionadas à galeria.`,
      color: "green",
    });

    yield put(fetchGallery({ storeId }));
    onSuccess?.();
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível salvar as imagens. Verifique o limite da galeria (máx. 50) e tente novamente.",
      color: "red",
    });
  } finally {
    yield put(setGallerySlice({ uploading: false }));
  }
}
