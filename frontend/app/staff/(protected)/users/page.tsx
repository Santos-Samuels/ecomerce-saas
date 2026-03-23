"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Stack,
  TextInput,
} from "@mantine/core";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchStaffUsers,
  saveStaffUser,
  deleteStaffUser,
} from "@/store/staffUsers/staffUsersSlice";
import { fetchStaffStores } from "@/store/staffStores/staffStoresSlice";
import { fetchStaffRoles } from "@/store/staffRoles/staffRolesSlice";
import { UsersTable, StaffUserRow } from "@/components/staff/users/UsersTable";
import { UserFormModal } from "@/components/staff/users/UserFormModal";
import { SaveStaffUserPayload } from "@/store/staffUsers/types";
import { StaffSidebar } from "@/components/staff/layout/StaffSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import * as L from "../styles";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { items, loading, saving, deletingId } = useAppSelector((state) => state.staffUsers);
  const stores = useAppSelector((state) => state.staffStores.items);
  const roles = useAppSelector((state) => state.staffRoles.items);

  const [search, setSearch] = useState("");
  const [opened, setOpened] = useState(false);
  const [editingUser, setEditingUser] = useState<SaveStaffUserPayload | null>(null);

  useEffect(() => {
    dispatch(fetchStaffUsers());
    dispatch(fetchStaffStores());
    dispatch(fetchStaffRoles());
  }, [dispatch]);

  const handleEdit = (user: StaffUserRow) => {
    setEditingUser({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address ?? "",
      storeId: user.storeId,
      roleId: user.roleId,
      active: user.active,
      password: "",
    });
    setOpened(true);
  };

  const handleDelete = (user: StaffUserRow) => {
    if (confirm(`Deseja realmente excluir o usuário ${user.name}?`)) {
      dispatch(deleteStaffUser({ id: user.id }));
    }
  };

  const handleSubmit = (values: SaveStaffUserPayload) => {
    dispatch(saveStaffUser(values));
    setOpened(false);
    setEditingUser(null);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  const storeOptions = stores.map((s) => ({ value: s.id, label: s.name }));
  const roleOptions = roles.map((r) => ({ value: r.id, label: r.name }));

  return (
    <L.StaffLayout>
      <StaffSidebar />

      <L.MainContent>
        <AdminPageHeader
          title="Usuários"
          subtitle="Gerencie os usuários e seus vínculos com as lojas."
          action={
            <Button
              leftSection={<FiPlus />}
              onClick={() => {
                setEditingUser(null);
                setOpened(true);
              }}
            >
              Novo Usuário
            </Button>
          }
        />

        <Stack gap="xl">
          <TextInput
            placeholder="Pesquisar usuários por nome ou email..."
            leftSection={<FiSearch />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />

          <UsersTable
            data={filteredItems as StaffUserRow[]}
            loading={loading}
            deletingId={deletingId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Stack>

        <UserFormModal
          opened={opened}
          loading={saving}
          initialValues={editingUser}
          storeOptions={storeOptions}
          roleOptions={roleOptions}
          onClose={() => {
            setOpened(false);
            setEditingUser(null);
          }}
          onSubmit={handleSubmit}
        />
      </L.MainContent>
    </L.StaffLayout>
  );
}
