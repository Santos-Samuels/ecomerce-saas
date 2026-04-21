"use client";

import { StoreFooter } from "@/components/storefront/common/StoreFooter";
import { StoreNotFound } from "@/components/storefront/common/StoreNotFound";
import { BaseScreen } from "@/components/storefront/common/layout/BaseScreen";
import { MainContent } from "@/components/storefront/common/layout/styles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCurrentStore,
  fetchPublicGallery,
} from "@/store/storefront/storefrontSlice";
import { Box, LoadingOverlay, SimpleGrid, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const dispatch = useAppDispatch();
  const {
    store: { data: store, loading: storeLoading, notFound: storeNotFound },
  } = useAppSelector((state) => state.storefront);
  const {
    items,
    loading: galleryLoading,
  } = useAppSelector((state) => state.storefront.gallery);

  const [subdomainInput, setSubdomainInput] = useState(() => {
    if (typeof window === "undefined") return "";
    const hostname = window.location.hostname;
    if (
      hostname.includes(".localhost") ||
      (hostname !== "localhost" && !hostname.includes("verel.app"))
    ) {
      return hostname.split(".")[0];
    }
    return "";
  });

  useEffect(() => {
    dispatch(fetchCurrentStore());
  }, [dispatch]);

  useEffect(() => {
    if (!store) return;
    dispatch(fetchPublicGallery());
  }, [dispatch, store]);

  const handleSimulate = () => {
    if (!subdomainInput) return;
    const protocol = window.location.protocol;
    if (subdomainInput === "localhost") {
      window.location.href = `${protocol}//localhost:3000`;
      return;
    }
    const newUrl = `${protocol}//${subdomainInput}.localhost:3000`;
    window.location.href = newUrl;
  };

  if (storeLoading) return <LoadingOverlay visible />;

  if (storeNotFound) {
    return (
      <StoreNotFound
        subdomainInput={subdomainInput}
        setSubdomainInput={setSubdomainInput}
        handleSimulate={handleSimulate}
      />
    );
  }

  return (
    <BaseScreen
      store={store}
      footer={
        <StoreFooter
          store={store}
          subdomainInput={subdomainInput}
          setSubdomainInput={setSubdomainInput}
          handleSimulate={handleSimulate}
        />
      }
    >
      <MainContent>
        <Box py="xl" px="md" maw={1280} mx="auto">
          <Title order={1} mb="xs" size="h2">
            Galeria
          </Title>
          <Text c="dimmed" mb="xl">
            Confira fotos da nossa loja.
          </Text>

          {galleryLoading ? (
            <LoadingOverlay visible />
          ) : items.length === 0 ? (
            <Text c="dimmed">Em breve novas fotos por aqui.</Text>
          ) : (
            <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
              {items.map((item) => (
                <Box key={item.id}>
                  <img
                    src={item.url}
                    alt=""
                    style={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </MainContent>
    </BaseScreen>
  );
}
