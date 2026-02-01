"use client";

import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { StoreLayoutForm } from "@/components/admin/store/layout/StoreLayoutForm";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchStoreLayout,
  updateStoreLayout
} from "@/store/storeLayout/storeLayoutSlice";
import { IStoreLayout } from "@ecomerce/shared";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import * as S from "../../styles";

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
      dispatch(fetchStoreLayout({ storeId }));
    }
  }, [dispatch, storeId]);

  useEffect(() => {
    if (storeLayout) {
      setFormState({ ...storeLayout });
    }
  }, [storeLayout]);

  const handleChange = (key: keyof IStoreLayout, value: string | boolean | null) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleUploadImage = (
    file: File,
    field: "heroBackgroundImage" | "aboutImage",
  ) => {
    const previewUrl = URL.createObjectURL(file);
    setFormState((prev) => ({ ...prev, [field]: previewUrl }));
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

    const { token, expire, signature, publicKey } =
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

      dispatch(updateStoreLayout({ ...updatedValues, storeId }));
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
          uploading={false}
          onSave={handleSave}
          saving={saving || loading}
        />
      </S.MainContent>
    </S.AdminLayout>
  );
}
