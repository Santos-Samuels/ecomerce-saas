import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { setStaffUsersSlice } from "@/store/staffUsers/staffUsersSlice";
import { IUser } from "@ecomerce/shared";

export function* handleFetchStaffUsers() {
  try {
    yield put(setStaffUsersSlice({ loading: true }));

    const response: { data: IUser[] } = yield call(api.get, "/users");

    yield put(
      setStaffUsersSlice({
        items: response.data,
      }),
    );
  } finally {
    yield put(setStaffUsersSlice({ loading: false }));
  }
}
