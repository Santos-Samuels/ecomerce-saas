import { publicApi } from "@/lib/api";
import { setStorefrontGallerySlice } from "@/store/storefront/slices/gallery.slice";
import { IGallery } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { call, put } from "redux-saga/effects";

export function* handleFetchPublicGallery() {
  try {
    yield put(setStorefrontGallerySlice({ loading: true }));
    const { data } = yield call(publicApi.get, "/gallery");
    yield put(
      setStorefrontGallerySlice({
        items: data,
        loading: false,
      }),
    );
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Não foi possível carregar a galeria.",
      color: "red",
    });
    yield put(setStorefrontGallerySlice({ loading: false }));
  }
}
