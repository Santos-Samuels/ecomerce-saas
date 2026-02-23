"use client";

import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { StaffSidebar } from "@/components/staff/layout/StaffSidebar";
import { PermissionFormModal } from "@/components/staff/permissions/PermissionFormModal";
import {
    PermissionRow,
    PermissionsTable,
} from "@/components/staff/permissions/PermissionsTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    deleteStaffPermission,
    fetchStaffPermissions,
    saveStaffPermission,
} from "@/store/staffPermissions/staffPermissionsSlice";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import * as S from "../styles";

export default function StaffPermissionsPage() {
  const dispatch = useAppDispatch();
  const { items, loading, saving, deletingId } = useAppSelector(
    (state) => state.staffPermissions,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PermissionRow | null>(null);

  useEffect(() => {
    dispatch(fetchStaffPermissions());
  }, [dispatch]);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (permission: PermissionRow) => {
    setEditing(permission);
    setModalOpen(true);
  };

  const handleDelete = (permission: PermissionRow) => {
    dispatch(
      deleteStaffPermission({
        id: permission.id,
      }),
    );
  };

  const handleSubmit = (values: {
    id?: string;
    code: string;
    name: string;
    description?: string;
  }) => {
    dispatch(
      saveStaffPermission({
        id: values.id,
        code: values.code,
        name: values.name,
        description: values.description,
      }),
    );
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <S.StaffLayout>
      <StaffSidebar />
      <S.MainContent>
        <AdminPageHeader
          title="Permissões"
          subtitle="Cadastre e gerencie as permissões disponíveis para as lojas."
          action={
            <Button leftSection={<FiPlus size={16} />} onClick={handleCreate}>
              Nova permissão
            </Button>
          }
        />

        <PermissionsTable
          data={items}
          loading={loading}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <PermissionFormModal
          key={`${editing?.id ?? "new"}-${modalOpen ? "open" : "closed"}`}
          opened={modalOpen}
          loading={saving}
          initialValues={editing}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSubmit={handleSubmit}
        />
      </S.MainContent>
    </S.StaffLayout>
  );
}
