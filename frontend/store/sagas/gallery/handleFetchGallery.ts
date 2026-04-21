import { api } from "@/lib/api";
import { setGallerySlice } from "@/store/gallery/gallerySlice";
import { FetchGalleryPayload } from "@/store/gallery/types";
import { IGallery } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";

export function* handleFetchGallery(
  _action: PayloadAction<FetchGalleryPayload>,
) {
  try {
    yield put(setGallerySlice({ loading: true }));

    const { data } = yield call(api.get, "/gallery");

    yield put(setGallerySlice({ items: data as IGallery[] }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível carregar a galeria.",
      color: "red",
    });
  } finally {
    yield put(setGallerySlice({ loading: false }));
  }
}
