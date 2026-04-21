"use client";

import { AdminContentLoader } from "@/components/admin/layout/AdminContentLoader";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { uploadToImageKit } from "@/lib/imagekit";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteGallery,
  fetchGallery,
  saveGalleryBatch,
} from "@/store/gallery/gallerySlice";
import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { FiTrash2, FiUpload } from "react-icons/fi";
import * as S from "../../styles";

const MAX_GALLERY = 50;
const MAX_BATCH = 10;

export default function AdminStoreGalleryPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items, loading, uploading, deletingId } = useAppSelector(
    (state) => state.gallery,
  );
  const [localUploading, setLocalUploading] = useState(false);

  const storeId = user?.storeId;
  const remaining = Math.max(0, MAX_GALLERY - items.length);
  const canUploadMore = remaining > 0;

  useEffect(() => {
    if (!user || !storeId) return;
    dispatch(fetchGallery({ storeId }));
  }, [dispatch, user, storeId]);

  if (!user || !storeId) return null;

  const handleFiles = async (files: File[] | null) => {
    if (!files?.length || !canUploadMore) return;

    const capped = files.slice(0, Math.min(MAX_BATCH, remaining));
    setLocalUploading(true);
    const urls: string[] = [];
    try {
      for (const file of capped) {
        const url = await uploadToImageKit(file, "gallery");
        urls.push(url);
      }
      dispatch(
        saveGalleryBatch({
          storeId,
          urls,
        }),
      );
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Falha ao enviar uma ou mais imagens.";
      notifications.show({
        title: "Erro no upload",
        message,
        color: "red",
      });
    } finally {
      setLocalUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Remover esta imagem da galeria?")) {
      dispatch(deleteGallery({ id, storeId }));
    }
  };

  const busy = uploading || localUploading;

  return (
    <S.AdminLayout>
      <AdminSidebar />

      <S.MainContent>
        <AdminPageHeader
          title="Galeria"
          subtitle="Imagens exibidas aos clientes na página Galeria da loja (máximo 50, até 10 por envio)"
          action={
            <FileButton
              onChange={handleFiles}
              accept="image/png,image/jpeg,image/webp"
              multiple
              disabled={!canUploadMore || busy}
            >
              {(props) => (
                <Button
                  {...props}
                  leftSection={<FiUpload size={16} />}
                  loading={busy}
                  disabled={!canUploadMore || busy}
                >
                  Enviar imagens
                </Button>
              )}
            </FileButton>
          }
        />

        <Stack gap="sm" mb="md">
          <Text size="sm" c="dimmed">
            {items.length} / {MAX_GALLERY} imagens
            {!canUploadMore && " — limite atingido"}
          </Text>
        </Stack>

        <AdminContentLoader loading={loading} label="Carregando galeria...">
          {items.length === 0 ? (
            <Text c="dimmed" size="sm">
              Nenhuma imagem na galeria. Use &quot;Enviar imagens&quot; para
              adicionar (até {MAX_BATCH} por vez).
            </Text>
          ) : (
            <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
              {items.map((item) => (
                <Box key={item.id} pos="relative">
                  <Image
                    src={item.url}
                    alt="Galeria"
                    radius="sm"
                    h={160}
                    fit="cover"
                  />
                  <Group justify="space-between" mt={6} wrap="nowrap" gap={4}>
                    <Text size="xs" c="dimmed" lineClamp={1} style={{ flex: 1 }}>
                      {new Date(item.createdAt).toLocaleString("pt-BR")}
                    </Text>
                    <ActionIcon
                      color="red"
                      variant="light"
                      size="sm"
                      loading={deletingId === item.id}
                      onClick={() => handleDelete(item.id)}
                      aria-label="Remover imagem"
                    >
                      <FiTrash2 size={14} />
                    </ActionIcon>
                  </Group>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </AdminContentLoader>
      </S.MainContent>
    </S.AdminLayout>
  );
}
