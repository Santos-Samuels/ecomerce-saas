"use client";

import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { FiPlus } from "react-icons/fi";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import { StaffSidebar } from "@/components/staff/layout/StaffSidebar";
import {
  StaffRoleRow,
  RolesTable,
} from "@/components/staff/roles/RolesTable";
import { RoleFormModal } from "@/components/staff/roles/RoleFormModal";
import { PermissionRow } from "@/components/staff/permissions/PermissionsTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteStaffRole,
  fetchStaffRoles,
  saveStaffRole,
} from "@/store/staffRoles/staffRolesSlice";
import { api } from "@/lib/api";
import * as S from "../styles";

export default function StaffRolesPage() {
  const dispatch = useAppDispatch();
  const { items, loading, saving, deletingId } = useAppSelector(
    (state) => state.staffRoles,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<StaffRoleRow | null>(null);
  const [permissionOptions, setPermissionOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    dispatch(fetchStaffRoles());
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

  const handleEdit = (role: StaffRoleRow) => {
    setEditing(role);
    setModalOpen(true);
  };

  const handleDelete = (role: StaffRoleRow) => {
    dispatch(
      deleteStaffRole({
        id: role.id,
      }),
    );
  };

  const handleSubmit = (values: { id?: string; name: string; permissions: string[] }) => {
    dispatch(
      saveStaffRole({
        id: values.id,
        name: values.name,
        permissions: values.permissions,
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
          title="Papéis de usuário"
          subtitle="Defina os papéis e as permissões de acesso dos usuários."
          action={
            <Button leftSection={<FiPlus size={16} />} onClick={handleCreate}>
              Novo papel
            </Button>
          }
        />

        <RolesTable
          data={items}
          loading={loading}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <RoleFormModal
          key={`${editing?.id ?? "new"}-${modalOpen ? "open" : "closed"}`}
          opened={modalOpen}
          loading={saving}
          initialValues={editing}
          permissionOptions={permissionOptions}
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

