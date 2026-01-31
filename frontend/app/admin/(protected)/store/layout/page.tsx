"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import * as S from "../../styles";
import { StoreLayoutForm } from "@/components/admin/store/layout/StoreLayoutForm";
import {
  fetchStoreLayoutRequest,
  updateStoreLayoutRequest,
} from "@/store/storeLayout/storeLayoutSlice";
import { api } from "@/lib/api";
import { IStoreLayout } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";

export default function StoreLayoutPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { data: storeLayout, loading } = useAppSelector(
    (state) => state.storeLayout,
  );

  const [formState, setFormState] = useState<Partial<IStoreLayout>>({});
  const [files, setFiles] = useState<{ [key: string]: File }>({});
  const [saving, setSaving] = useState(false);

  const storeId = user?.storeId;

  useEffect(() => {
    if (storeId) {
      dispatch(fetchStoreLayoutRequest()); // fetchStoreLayoutRequest saga will likely need storeId passed or picked from selector.
      // Wait, my saga implementation for fetchStoreLayoutRequest expects storeId in payload?
      // Let's check handleFetchStoreLayout.ts.
      // "const { storeId } = action.payload || {};"
      // But fetchStoreLayoutRequest is defined as "fetchStoreLayoutRequest: (state) => { ... }" in slice?
      // No, let's check slice definition.
    }
  }, [dispatch, storeId]);

  // Checking slice definition:
  // reducers: { fetchStoreLayoutRequest: (state) => { ... } }
  // It doesn't accept payload in the slice reducer, BUT the action creator generated might not accept payload if not defined.
  // Actually, if I want to pass payload to saga, I should define it in slice.
  // "fetchStoreLayoutRequest: (state, action: PayloadAction<{ storeId: string }>) => ..."
  // I need to fix slice if I want to pass storeId.
  // OR, I can just use a separate action or rely on the fact that standard redux toolkit actions can carry payload if defined.
  // Let's fix the slice to accept payload or at least allow it.

  useEffect(() => {
    if (storeLayout) {
      setFormState({ ...storeLayout });
    }
  }, [storeLayout]);

  const handleChange = (key: keyof IStoreLayout, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleUploadImage = (
    file: File,
    field: "heroBackgroundImage" | "aboutImage",
  ) => {
    // Create preview
    const previewUrl = URL.createObjectURL(file);

    // Update form state with preview (so user sees it immediately)
    setFormState((prev) => ({ ...prev, [field]: previewUrl }));

    // Store file for upload on save
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const uploadFile = async (file: File) => {
    const authResponse = await api.get<{
      token: string;
      expire: number;
      signature: string;
      publicKey: string;
      urlEndpoint: string;
    }>("/imagekit/auth");

    const { token, expire, signature, publicKey, urlEndpoint } =
      authResponse.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("publicKey", publicKey);
    formData.append("signature", signature);
    formData.append("expire", expire.toString());
    formData.append("token", token);
    formData.append("useUniqueFileName", "true");
    formData.append("folder", "/store-layout");

    const uploadResponse = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await uploadResponse.json();
    return data.url;
  };

  const handleSave = async () => {
    if (!storeId) return;
    setSaving(true);

    try {
      const updatedValues = { ...formState };

      // Upload pending files
      for (const [key, file] of Object.entries(files)) {
        try {
          const url = await uploadFile(file);
          updatedValues[key as keyof IStoreLayout] = url;
        } catch (error) {
          console.error(`Error uploading ${key}:`, error);
          notifications.show({
            title: "Erro no upload",
            message: `Falha ao fazer upload da imagem de ${key}`,
            color: "red",
          });
          setSaving(false);
          return;
        }
      }

      // Dispatch update
      // My saga expects: action.payload containing storeId and partial data.
      dispatch(updateStoreLayoutRequest({ ...updatedValues, storeId }));

      // Clear files
      setFiles({});
    } catch (error) {
      console.error("Error saving layout:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <S.AdminLayout>
      <AdminSidebar />
      <S.MainContent>
        <AdminPageHeader
          title="Layout da Loja"
          subtitle="Personalize a aparência da página inicial da sua loja."
        />

        <StoreLayoutForm
          values={formState}
          onChange={handleChange}
          onUploadImage={handleUploadImage}
          uploading={false} // Upload happens on save
          onSave={handleSave}
          saving={saving || loading}
        />
      </S.MainContent>
    </S.AdminLayout>
  );
}
