import { DataTable, DataTableColumn } from "@/components/ui/DataTable";
import { IUser } from "@ecomerce/shared";
import { ActionIcon, Badge, Group, Text, Tooltip } from "@mantine/core";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export type StaffUserRow = IUser & {
  store?: { name: string } | null;
  role?: { name: string } | null;
};

interface UsersTableProps {
  data: StaffUserRow[];
  loading?: boolean;
  deletingId?: string;
  onEdit(user: StaffUserRow): void;
  onDelete(user: StaffUserRow): void;
}

export function UsersTable({
  data,
  loading,
  deletingId,
  onEdit,
  onDelete,
}: UsersTableProps) {
  const columns: DataTableColumn<StaffUserRow>[] = [
    {
      key: "name",
      header: "Usuário",
      render: (user) => (
        <>
          <Text size="sm" fw={600}>
            {user.name}
          </Text>
          <Text size="xs" c="dimmed">
            {user.email}
          </Text>
        </>
      ),
    },
    {
      key: "role",
      header: "Cargo",
      render: (user) => (
        <Badge color="blue" variant="light" size="sm">
          {user.role?.name || "Sem cargo"}
        </Badge>
      ),
    },
    {
      key: "store",
      header: "Loja",
      render: (user) => (
        <Text size="sm">{user.store?.name || "Administrador Geral"}</Text>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <Badge color={user.active ? "green" : "gray"} variant="light" size="sm">
          {user.active ? "Ativo" : "Inativo"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      align: "right",
      width: 100,
      render: (user) => (
        <Group gap={4} justify="flex-end">
          <Tooltip label="Editar usuário" withArrow>
            <ActionIcon
              variant="subtle"
              size="sm"
              aria-label="Editar usuário"
              onClick={() => onEdit(user)}
            >
              <FiEdit2 size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Excluir usuário" withArrow>
            <ActionIcon
              variant="subtle"
              size="sm"
              color="red"
              aria-label="Excluir usuário"
              onClick={() => onDelete(user)}
              loading={deletingId === user.id}
            >
              <FiTrash2 size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      getRowKey={(user) => user.id}
    />
  );
}
