import { call, put } from "redux-saga/effects";
import { api } from "@/lib/api";
import { logout, setAuthSlice } from "../../auth/authSlice";
import { IUser } from "@ecomerce/shared";
import { deleteCookie } from "cookies-next";

export function* handleValidateAuth() {
  try {
    const response: { data: IUser } = yield call(api.get, "/auth/me");

    yield put(
      setAuthSlice({
        user: response.data,
      })
    );
  } catch {
    yield put(logout());
    deleteCookie("ecomerce-token");
  }
}
