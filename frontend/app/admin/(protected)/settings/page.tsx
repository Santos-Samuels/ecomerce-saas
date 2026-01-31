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

export default function StoreSettingsPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { store, loading, saving } = useAppSelector(
    (state) => state.storeSettings
  );
  const [formState, setFormState] = useState<StoreFormValues | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | undefined>(
    undefined
  );
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);

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
      primaryColor: store.primaryColor ?? null,
      instagramHandle: store.instagramHandle ?? undefined,
    });
    setLogoPreviewUrl(store.logoUrl ?? undefined);
    setLogoFile(null);
  }, [store]);

  useEffect(() => {
    return () => {
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl);
      }
    };
  }, [logoPreviewUrl]);

  if (!user || !storeId) return null;

  const handleChange = <K extends keyof StoreFormValues>(
    key: K,
    value: StoreFormValues[K]
  ) => {
    setFormState((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleUploadLogo = (file: File) => {
    if (!formState) return;

    if (logoPreviewUrl) {
      URL.revokeObjectURL(logoPreviewUrl);
    }

    const previewUrl = URL.createObjectURL(file);

    setLogoPreviewUrl(previewUrl);
    setLogoFile(file);
  };

  const handleSubmit = async () => {
    if (!formState) return;

    try {
      setUploadingLogo(true);

      let logoUrl = formState.logoUrl;

      if (logoFile) {
        const authResponse = await api.get<{
          token: string;
          expire: number;
          signature: string;
          publicKey: string;
          uploadEndpoint: string;
        }>("/imagekit/auth");

        const { token, expire, signature, publicKey, uploadEndpoint } =
          authResponse.data;

        const formData = new FormData();
        formData.append("file", logoFile);
        formData.append("fileName", logoFile.name);
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

        logoUrl = uploadData.url;
        setLogoPreviewUrl(uploadData.url);
        setLogoFile(null);
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
          primaryColor: formState.primaryColor,
        })
      );
    } finally {
      setUploadingLogo(false);
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
            uploadingLogo={uploadingLogo}
            logoPreviewUrl={logoPreviewUrl}
            onChange={handleChange}
            onUploadLogo={handleUploadLogo}
            onSubmit={handleSubmit}
          />
        )}
      </S.MainContent>
    </S.AdminLayout>
  );
}
