import { DataTable, DataTableColumn } from "@/components/ui/DataTable";
import { IRole } from "@ecomerce/shared";
import { ActionIcon, Badge, Group, Text, Tooltip } from "@mantine/core";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export type StaffRoleRow = Pick<IRole, "id" | "name" | "permissions" | "active">;

interface RolesTableProps {
  data: StaffRoleRow[];
  loading?: boolean;
  deletingId?: string;
  onEdit(role: StaffRoleRow): void;
  onDelete(role: StaffRoleRow): void;
}

export function RolesTable({
  data,
  loading,
  deletingId,
  onEdit,
  onDelete,
}: RolesTableProps) {
  const columns: DataTableColumn<StaffRoleRow>[] = [
    {
      key: "name",
      header: "Nome",
      render: (role) => (
        <Group gap={6}>
          <Text size="sm" fw={600} lineClamp={1} title={role.name}>
            {role.name}
          </Text>
          {!role.active && (
            <Badge size="xs" color="gray" variant="light">
              Inativo
            </Badge>
          )}
        </Group>
      ),
    },
    {
      key: "permissions",
      header: "Permissões",
      render: (role) =>
        role.permissions.length === 0 ? (
          <Text size="xs" c="dimmed">
            Nenhuma permissão
          </Text>
        ) : (
          <Text size="xs" c="dimmed" lineClamp={2} title={role.permissions.join(", ")}>
            {role.permissions.join(", ")}
          </Text>
        ),
    },
    {
      key: "actions",
      header: "Ações",
      align: "right",
      width: 120,
      render: (role) => (
        <Group gap={4} justify="flex-end">
          <Tooltip label="Editar papel" withArrow>
            <ActionIcon
              variant="subtle"
              size="sm"
              aria-label="Editar papel"
              onClick={() => onEdit(role)}
            >
              <FiEdit2 size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Remover papel" withArrow>
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              aria-label="Remover papel"
              disabled={deletingId === role.id}
              onClick={() => onDelete(role)}
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
      emptyMessage="Nenhum papel cadastrado ainda."
      getRowKey={(role) => role.id}
    />
  );
}

