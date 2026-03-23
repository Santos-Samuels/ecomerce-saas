import { publicApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { WhatsAppMessagePayload } from "../../whatsapp/types";
import { setWhatsAppSlice } from "../../whatsapp/whatsappSlice";

export function* handleSendWhatsAppMessage(
  action: PayloadAction<WhatsAppMessagePayload>
) {
  try {
    const { to, templateName, languageCode, components } = action.payload;

    yield put(setWhatsAppSlice({ loading: true, success: false, error: null }));

    yield call(publicApi.post, "/notifications/whatsapp", {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: languageCode,
        },
        components,
      },
    });

    yield put(setWhatsAppSlice({ loading: false, success: true }));
    notifications.show({
      title: "Sucesso",
      message: "Pedido enviado com sucesso para o WhatsApp!",
      color: "green",
    });
  } catch (error: any) {
    console.error("WhatsApp Send Error:", error);
    yield put(
      setWhatsAppSlice({
        loading: false,
        success: false,
        error: error.message || "Erro ao enviar mensagem",
      })
    );
    notifications.show({
      title: "Erro",
      message:
        "Não foi possível enviar a mensagem para o WhatsApp. Tente novamente.",
      color: "red",
    });
  }
}
