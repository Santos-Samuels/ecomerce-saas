import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { DataTable, DataTableColumn } from "@/components/ui/DataTable";

export interface PermissionRow {
  id: string;
  code: string;
  name: string;
  description?: string;
}

interface PermissionsTableProps {
  data: PermissionRow[];
  loading?: boolean;
  deletingId?: string;
  onEdit(permission: PermissionRow): void;
  onDelete(permission: PermissionRow): void;
}

export function PermissionsTable({
  data,
  loading,
  deletingId,
  onEdit,
  onDelete,
}: PermissionsTableProps) {
  const columns: DataTableColumn<PermissionRow>[] = [
    {
      key: "code",
      header: "Código",
      render: (permission) => (
        <Text size="sm" fw={500}>
          {permission.code}
        </Text>
      ),
    },
    {
      key: "name",
      header: "Nome",
      render: (permission) => (
        <Text size="sm" lineClamp={1} title={permission.name}>
          {permission.name}
        </Text>
      ),
    },
    {
      key: "description",
      header: "Descrição",
      render: (permission) => (
        <Text
          size="xs"
          c="dimmed"
          lineClamp={2}
          title={permission.description ?? ""}
        >
          {permission.description}
        </Text>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      align: "right",
      width: 120,
      render: (permission) => (
        <Group gap={4} justify="flex-end">
          <Tooltip label="Editar permissão" withArrow>
            <ActionIcon
              variant="subtle"
              size="sm"
              aria-label="Editar permissão"
              onClick={() => onEdit(permission)}
            >
              <FiEdit2 size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Remover permissão" withArrow>
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              aria-label="Remover permissão"
              disabled={deletingId === permission.id}
              onClick={() => onDelete(permission)}
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
      emptyMessage="Nenhuma permissão cadastrada ainda."
      getRowKey={(permission) => permission.id}
    />
  );
}

