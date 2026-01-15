import { login } from "@/store/auth/authSlice";
import { takeLatest } from "redux-saga/effects";
import { handleLogin } from "./handleLogin";

export function* watchAuth() {
  yield takeLatest(login.type, handleLogin);
}
