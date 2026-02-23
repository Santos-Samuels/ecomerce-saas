"use client";

import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { StaffSidebar } from "@/components/staff/layout/StaffSidebar";
import { PermissionRow } from "@/components/staff/permissions/PermissionsTable";
import {
  StoreFormModal,
  StoreFormValues,
} from "@/components/staff/stores/StoreFormModal";
import {
  StaffStoreRow,
  StoresTable,
} from "@/components/staff/stores/StoresTable";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  activateStaffStore,
  clearStaffStoreDetails,
  deleteStaffStore,
  fetchStaffStoreDetails,
  fetchStaffStores,
  saveStaffStore,
} from "@/store/staffStores/staffStoresSlice";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import * as L from "../styles";

export default function StaffStoresPage() {
  const dispatch = useAppDispatch();
  const { items, loading, saving, deletingId, current, currentLoading } = useAppSelector(
    (state) => state.staffStores,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<StoreFormValues | null>(null);
  const [permissionOptions, setPermissionOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    dispatch(fetchStaffStores());
  }, [dispatch]);

  useEffect(() => {
    const loadPermissions = async () => {
      const response = await api.get<PermissionRow[]>("/permissions");
      setPermissionOptions(
        response.data.map((p) => ({
          value: p.code,
          label: `${p.name} (${p.code})`,
        })),
      );
    };

    loadPermissions();
  }, []);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (row: StaffStoreRow) => {
    dispatch(fetchStaffStoreDetails({ id: row.id }));
    setModalOpen(true);
  };

  const handleDelete = (row: StaffStoreRow) => {
    if (!confirm("Tem certeza que deseja desativar esta loja?")) return;
    dispatch(
      deleteStaffStore({
        id: row.id,
      }),
    );
  };

  const handleToggleActive = (row: StaffStoreRow) => {
    if (row.active) {
      if (!confirm("Tem certeza que deseja desativar esta loja?")) return;
      dispatch(deleteStaffStore({ id: row.id }));
    } else {
      dispatch(activateStaffStore({ id: row.id }));
    }
  };

  const handleView = (row: StaffStoreRow) => {
    window.location.href = `/staff/stores/${row.id}`;
  };

  const handleSubmit = (values: StoreFormValues) => {
    dispatch(
      saveStaffStore({
        id: values.id,
        name: values.name,
        description: values.description,
        address: values.address,
        phone: values.phone,
        email: values.email,
        primaryColor: values.primaryColor,
        instagramHandle: values.instagramHandle,
        subdomain: values.subdomain,
        permissions: (values.permissions ?? []) as string[],
      }),
    );
    setModalOpen(false);
    setEditing(null);
    dispatch(clearStaffStoreDetails());
  };

  return (
    <L.StaffLayout>
      <StaffSidebar />
      <L.MainContent>
        <AdminPageHeader
          title="Lojas"
          subtitle="Cadastre e gerencie as lojas da plataforma."
          action={
            <Button leftSection={<FiPlus size={16} />} onClick={handleCreate}>
              Nova loja
            </Button>
          }
        />

        <StoresTable
          data={items}
          loading={loading}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onToggleActive={handleToggleActive}
        />

        <StoreFormModal
          key={`${current?.id ?? "new"}-${modalOpen ? "open" : "closed"}`}
          opened={modalOpen}
          loading={saving || currentLoading}
          initialValues={
            current
              ? {
                  id: current.id,
                  name: current.name,
                  description: current.description ?? "",
                  address: current.address ?? "",
                  phone: current.phone,
                  email: current.email,
                  logoUrl: current.logoUrl ?? "",
                  primaryColor: current.primaryColor ?? "",
                  instagramHandle: current.instagramHandle ?? "",
                  subdomain: current.subdomain ?? "",
                  permissions: current.permissions ?? [],
                }
              : editing
          }
          permissionOptions={permissionOptions}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
            dispatch(clearStaffStoreDetails());
          }}
          onSubmit={handleSubmit}
        />
      </L.MainContent>
    </L.StaffLayout>
  );
}
