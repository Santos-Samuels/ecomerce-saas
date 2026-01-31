import { login, validateAuth } from "@/store/auth/authSlice";
import { takeLatest } from "redux-saga/effects";
import { handleLogin } from "./handleLogin";
import { handleValidateAuth } from "./handleValidateAuth";

export function* watchAuth() {
  yield takeLatest(login.type, handleLogin);
  yield takeLatest(validateAuth.type, handleValidateAuth);
}
