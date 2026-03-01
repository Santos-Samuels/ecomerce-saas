"use client";

import { ReactNode, useEffect } from "react";
import { Loader, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { StorePermission } from "@ecomerce/shared";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchStoreSettings } from "@/store/storeSettings/storeSettingsSlice";

interface AdminPermissionGuardProps {
  requiredPermissions?: StorePermission[];
  children: ReactNode;
}

export function AdminPermissionGuard({
  requiredPermissions,
  children,
}: AdminPermissionGuardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const { store, loading } = useAppSelector((state) => state.storeSettings);

  useEffect(() => {
    if (!user?.storeId) return;
    if (store || loading) return;
    dispatch(
      fetchStoreSettings({
        storeId: user.storeId,
      }),
    );
  }, [dispatch, store, loading, user?.storeId]);

  useEffect(() => {
    if (!requiredPermissions || requiredPermissions.length === 0) return;
    if (!user || !user.storeId) return;
    if (!store || loading) return;

    const storePermissions = store.permissions ?? [];
    const hasRequired = requiredPermissions.some((perm) =>
      storePermissions.includes(perm),
    );

    if (!hasRequired) {
      router.replace("/admin");
    }
  }, [loading, requiredPermissions, router, store, user]);

  if (!requiredPermissions || requiredPermissions.length === 0) {
    return <>{children}</>;
  }

  if (!user || !user.storeId) {
    router.replace("/admin/login");
    return null;
  }

  if (!store || loading) {
    return (
      <Stack
        gap="xs"
        align="center"
        justify="center"
        style={{ minHeight: 160 }}
      >
        <Loader size="sm" />
        <Text size="sm" c="dimmed">
          Carregando permissões da loja...
        </Text>
      </Stack>
    );
  }

  return <>{children}</>;
}
