import { api } from "./api";

interface ImageKitAuthResponse {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
  uploadEndpoint: string;
}

interface UploadResponse {
  url?: string;
  fileId?: string;
  name?: string;
  size?: number;
  filePath?: string;
  urlEndpoint?: string;
  fileType?: string;
}

export async function uploadToImageKit(
  file: File,
  folder: string = "products"
): Promise<string> {
  // 1. Get auth params from backend
  const authResponse = await api.get<ImageKitAuthResponse>("/imagekit/auth");
  const { token, expire, signature, publicKey, uploadEndpoint } =
    authResponse.data;

  // 2. Prepare form data for ImageKit
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("publicKey", publicKey);
  formData.append("token", token);
  formData.append("expire", String(expire));
  formData.append("signature", signature);
  formData.append("folder", folder);

  // 3. Upload directly to ImageKit
  const uploadResponse = await fetch(uploadEndpoint, {
    method: "POST",
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error(`Upload failed: ${uploadResponse.statusText}`);
  }

  const uploadData = (await uploadResponse.json()) as UploadResponse;

  if (!uploadData.url) {
    throw new Error("Upload response missing URL");
  }

  return uploadData.url;
}
