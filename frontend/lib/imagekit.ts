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

// Helper to resize/compress image before upload
async function compressImage(
  file: File,
  maxDimension: number = 2048,
  quality: number = 0.8
): Promise<File> {
  // If not an image, return original
  if (!file.type.startsWith("image/")) return file;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // If image is smaller than max dimension, return original to avoid unnecessary processing
        if (
          width <= maxDimension &&
          height <= maxDimension &&
          file.size < 2 * 1024 * 1024
        ) {
          resolve(file);
          return;
        }

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(file); // Fallback to original if canvas fails
          return;
        }

        // Draw on white background (for transparent PNGs converted to JPEG)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file); // Fallback
              return;
            }
            // Always convert to JPEG for consistency and compression
            const newFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, "") + ".jpg",
              {
                type: "image/jpeg",
                lastModified: Date.now(),
              }
            );
            resolve(newFile);
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function uploadToImageKit(
  file: File,
  folder: string = "products"
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Arquivo selecionado não é uma imagem válida.");
  }

  // Pre-validate size (max 20MB hard limit before compression attempts)
  const HARD_LIMIT = 20 * 1024 * 1024;
  if (file.size > HARD_LIMIT) {
    throw new Error("Arquivo muito grande. Máximo permitido: 20MB");
  }

  // Compress/Resize image
  // This fixes issues with huge resolutions (e.g. 8000px+) breaking uploads or consuming too much bandwidth
  const processedFile = await compressImage(file);

  // 1. Get auth params from backend
  const authResponse = await api.get<ImageKitAuthResponse>("/imagekit/auth");
  const { token, expire, signature, publicKey, uploadEndpoint } =
    authResponse.data;

  // 2. Prepare form data for ImageKit
  const formData = new FormData();
  formData.append("file", processedFile);
  formData.append("fileName", processedFile.name);
  formData.append("publicKey", publicKey);
  formData.append("token", token);
  formData.append("expire", String(expire));
  formData.append("signature", signature);
  formData.append("folder", folder);
  formData.append("useUniqueFileName", "true");

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

  if (uploadData.fileType && uploadData.fileType !== "image") {
    throw new Error(
      "Arquivo enviado não foi detectado como imagem pelo servidor."
    );
  }

  return uploadData.url;
}
