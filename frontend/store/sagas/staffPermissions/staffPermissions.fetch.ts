import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { PermissionRow } from "@/components/staff/permissions/PermissionsTable";
import { setStaffPermissionsSlice } from "@/store/staffPermissions/staffPermissionsSlice";

export function* handleFetchStaffPermissions() {
  try {
    yield put(setStaffPermissionsSlice({ loading: true }));

    const response: { data: PermissionRow[] } = yield call(
      api.get,
      "/permissions",
    );

    yield put(
      setStaffPermissionsSlice({
        items: response.data,
      }),
    );
  } finally {
    yield put(setStaffPermissionsSlice({ loading: false }));
  }
}

