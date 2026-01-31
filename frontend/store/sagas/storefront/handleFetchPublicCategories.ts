import { publicApi } from "@/lib/api";
import {
  fetchPublicCategoriesFailure,
  fetchPublicCategoriesSuccess,
} from "@/store/storefront/storefrontSlice";
import { IProductCategory } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { call, put } from "redux-saga/effects";

export function* handleFetchPublicCategories() {
  try {
    const { data } = yield call(publicApi.get, "/products/categories");
    yield put(fetchPublicCategoriesSuccess(data as IProductCategory[]));
  } catch (_error) {
    notifications.show({
      title: "Erro",
      message: "Erro ao buscar categorias",
      color: "red",
    });
    yield put(fetchPublicCategoriesFailure());
  }
}
