"use client";

import { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import * as S from "../styles";
import {
  StoreFormValues,
  StoreSettingsForm,
} from "@/components/admin/settings/StoreSettingsForm";
import {
  fetchStoreSettings,
  saveStoreSettings,
} from "@/store/storeSettings/storeSettingsSlice";
import { api } from "@/lib/api";

type ImageKitAuth = {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
  uploadEndpoint: string;
};

async function uploadImageToImageKit(
  file: File,
  storeId: string,
): Promise<string> {
  const authResponse = await api.get<ImageKitAuth>("/imagekit/auth");

  const { token, expire, signature, publicKey, uploadEndpoint } =
    authResponse.data;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("publicKey", publicKey);
  formData.append("token", token);
  formData.append("expire", String(expire));
  formData.append("signature", signature);
  formData.append("folder", `stores/${storeId}`);

  const uploadResponse = await fetch(uploadEndpoint, {
    method: "POST",
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error("Upload failed");
  }

  const uploadData = (await uploadResponse.json()) as { url?: string };

  if (!uploadData.url) {
    throw new Error("Upload response missing URL");
  }

  return uploadData.url;
}

function revokeBlobUrl(url: string | undefined) {
  if (url?.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

export default function StoreSettingsPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { store, loading, saving } = useAppSelector(
    (state) => state.storeSettings,
  );
  const [formState, setFormState] = useState<StoreFormValues | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | undefined>(
    undefined,
  );
  const [storefrontPreviewUrl, setStorefrontPreviewUrl] = useState<
    string | undefined
  >(undefined);
  const [uploading, setUploading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [storefrontFile, setStorefrontFile] = useState<File | null>(null);

  const storeId = user?.storeId;

  useEffect(() => {
    if (!user || !storeId) return;
    dispatch(fetchStoreSettings({ storeId }));
  }, [dispatch, user, storeId]);

  useEffect(() => {
    if (!store) return;

    setFormState({
      id: store.id,
      name: store.name,
      description: store.description ?? undefined,
      address: store.address ?? undefined,
      phone: store.phone,
      email: store.email,
      logoUrl: store.logoUrl ?? undefined,
      mapEmbedUrl: store.mapEmbedUrl ?? null,
      storefrontImageUrl: store.storefrontImageUrl ?? null,
      primaryColor: store.primaryColor ?? null,
      instagramHandle: store.instagramHandle ?? undefined,
    });
    setLogoPreviewUrl(store.logoUrl ?? undefined);
    setStorefrontPreviewUrl(store.storefrontImageUrl ?? undefined);
    setLogoFile(null);
    setStorefrontFile(null);
  }, [store]);

  useEffect(() => {
    return () => {
      revokeBlobUrl(logoPreviewUrl);
      revokeBlobUrl(storefrontPreviewUrl);
    };
  }, [logoPreviewUrl, storefrontPreviewUrl]);

  if (!user || !storeId) return null;

  const handleChange = <K extends keyof StoreFormValues>(
    key: K,
    value: StoreFormValues[K],
  ) => {
    setFormState((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleUploadLogo = (file: File) => {
    if (!formState) return;

    revokeBlobUrl(logoPreviewUrl);

    const previewUrl = URL.createObjectURL(file);

    setLogoPreviewUrl(previewUrl);
    setLogoFile(file);
  };

  const handleUploadStorefront = (file: File) => {
    if (!formState) return;

    revokeBlobUrl(storefrontPreviewUrl);

    const previewUrl = URL.createObjectURL(file);

    setStorefrontPreviewUrl(previewUrl);
    setStorefrontFile(file);
  };

  const handleSubmit = async () => {
    if (!formState) return;

    try {
      setUploading(true);

      let logoUrl = formState.logoUrl;
      let storefrontImageUrl = formState.storefrontImageUrl;

      if (logoFile) {
        logoUrl = await uploadImageToImageKit(logoFile, storeId);
        setLogoPreviewUrl(logoUrl);
        setLogoFile(null);
      }

      if (storefrontFile) {
        storefrontImageUrl = await uploadImageToImageKit(
          storefrontFile,
          storeId,
        );
        setStorefrontPreviewUrl(storefrontImageUrl);
        setStorefrontFile(null);
      }

      dispatch(
        saveStoreSettings({
          id: formState.id,
          name: formState.name,
          description: formState.description,
          address: formState.address,
          phone: formState.phone,
          email: formState.email,
          logoUrl,
          mapEmbedUrl: formState.mapEmbedUrl?.trim()
            ? formState.mapEmbedUrl.trim()
            : null,
          storefrontImageUrl,
          primaryColor: formState.primaryColor,
          instagramHandle: formState.instagramHandle,
        }),
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <S.AdminLayout>
      <AdminSidebar />

      <S.MainContent>
        <AdminPageHeader
          title="Configurações da loja"
          subtitle="Gerencie as informações gerais da sua loja."
        />

        {!formState && (
          <Text size="sm" c="dimmed">
            {loading ? "Carregando dados da loja..." : "Loja não encontrada."}
          </Text>
        )}

        {formState && (
          <StoreSettingsForm
            store={formState}
            saving={saving}
            uploading={uploading}
            logoPreviewUrl={logoPreviewUrl}
            storefrontPreviewUrl={storefrontPreviewUrl}
            onChange={handleChange}
            onUploadLogo={handleUploadLogo}
            onUploadStorefront={handleUploadStorefront}
            onSubmit={handleSubmit}
          />
        )}
      </S.MainContent>
    </S.AdminLayout>
  );
}
