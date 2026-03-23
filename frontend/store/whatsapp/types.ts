export interface WhatsAppMessagePayload {
  to: string;
  templateName: string;
  languageCode: string;
  components?: any[];
}

export interface WhatsAppState {
  loading: boolean;
  success: boolean;
  error: string | null;
}
