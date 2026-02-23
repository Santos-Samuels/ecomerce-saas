import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { StaffStoreRow } from "@/components/staff/stores/StoresTable";
import { setStaffStoresSlice } from "@/store/staffStores/staffStoresSlice";

export function* handleFetchStaffStores() {
  try {
    yield put(setStaffStoresSlice({ loading: true }));

    const response: { data: StaffStoreRow[] } = yield call(api.get, "/stores");

    yield put(
      setStaffStoresSlice({
        items: response.data,
      }),
    );
  } finally {
    yield put(setStaffStoresSlice({ loading: false }));
  }
}

