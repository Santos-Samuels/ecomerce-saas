import { publicApi } from "@/lib/api";
import {
  setCategorySlice
} from "@/store/storefront/slices/category.slice";
import { IProductCategory } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { call, put } from "redux-saga/effects";

export function* handleFetchPublicCategories() {
  try {
    yield put(setCategorySlice({ loading: true }));
    const { data } = yield call(publicApi.get, "/products/categories");
    yield put(setCategorySlice({ items: data as IProductCategory[], loading: false }));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Erro ao buscar categorias",
      color: "red",
    });
    yield put(setCategorySlice({ loading: false }));
  }
}
