import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { StaffRoleRow } from "@/components/staff/roles/RolesTable";
import { setStaffRolesSlice } from "@/store/staffRoles/staffRolesSlice";

export function* handleFetchStaffRoles() {
  try {
    yield put(setStaffRolesSlice({ loading: true }));

    const response: { data: StaffRoleRow[] } = yield call(api.get, "/roles");

    yield put(
      setStaffRolesSlice({
        items: response.data,
      }),
    );
  } finally {
    yield put(setStaffRolesSlice({ loading: false }));
  }
}

