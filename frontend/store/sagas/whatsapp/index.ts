import { takeLatest } from "redux-saga/effects";
import { sendWhatsAppMessage } from "../../whatsapp/whatsappSlice";
import { handleSendWhatsAppMessage } from "./handleSendWhatsAppMessage";

export function* whatsappSaga() {
  yield takeLatest(sendWhatsAppMessage.type, handleSendWhatsAppMessage);
}
