import { DataTable, DataTableColumn } from "@/components/ui/DataTable";
import { IStore } from "@ecomerce/shared";
import { ActionIcon, Badge, Group, Text, Tooltip } from "@mantine/core";
import { FiEdit2, FiEye, FiPower, FiTrash2 } from "react-icons/fi";

export type StaffStoreRow = Pick<
  IStore,
  "id" | "name" | "email" | "phone" | "active" | "createdAt"
> & {
  subdomain?: string | null;
};

interface StoresTableProps {
  data: StaffStoreRow[];
  loading?: boolean;
  deletingId?: string;
  onEdit(store: StaffStoreRow): void;
  onDelete(store: StaffStoreRow): void;
  onView?(store: StaffStoreRow): void;
  onToggleActive?(store: StaffStoreRow): void;
}

export function StoresTable({
  data,
  loading,
  deletingId,
  onEdit,
  onDelete,
  onView,
  onToggleActive,
}: StoresTableProps) {
  const columns: DataTableColumn<StaffStoreRow>[] = [
    {
      key: "name",
      header: "Loja",
      render: (store) => (
        <>
          <Text size="sm" fw={600} lineClamp={1} title={store.name}>
            {store.name}
          </Text>
          <Text size="xs" c="dimmed" lineClamp={1} title={store.email}>
            {store.email}
          </Text>
        </>
      ),
    },
    {
      key: "phone",
      header: "Telefone",
      render: (store) => <Text size="sm">{store.phone}</Text>,
    },
    {
      key: "subdomain",
      header: "Subdomínio",
      render: (store) =>
        store.subdomain ? (
          <Text size="sm">{store.subdomain}</Text>
        ) : (
          <Text size="xs" c="dimmed">
            —
          </Text>
        ),
    },
    {
      key: "status",
      header: "Status",
      render: (store) => (
        <Badge color={store.active ? "green" : "gray"} variant="light" size="sm">
          {store.active ? "Ativa" : "Inativa"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      align: "right",
      width: 120,
      render: (store) => (
        <Group gap={4} justify="flex-end">
          {onView && (
            <Tooltip label="Ver detalhes" withArrow>
              <ActionIcon
                variant="subtle"
                size="sm"
                aria-label="Ver detalhes"
                onClick={() => onView(store)}
              >
                <FiEye size={16} />
              </ActionIcon>
            </Tooltip>
          )}
          <Tooltip label="Editar loja" withArrow>
            <ActionIcon
              variant="subtle"
              size="sm"
              aria-label="Editar loja"
              onClick={() => onEdit(store)}
            >
              <FiEdit2 size={16} />
            </ActionIcon>
          </Tooltip>
          {onToggleActive ? (
            <Tooltip
              label={store.active ? "Desativar loja" : "Ativar loja"}
              withArrow
            >
              <ActionIcon
                variant="subtle"
                color={store.active ? "red" : "green"}
                size="sm"
                aria-label={store.active ? "Desativar loja" : "Ativar loja"}
                disabled={deletingId === store.id}
                onClick={() => onToggleActive(store)}
              >
                <FiPower size={16} />
              </ActionIcon>
            </Tooltip>
          ) : (
            <Tooltip label="Desativar loja" withArrow>
              <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                aria-label="Desativar loja"
                disabled={deletingId === store.id}
                onClick={() => onDelete(store)}
              >
                <FiTrash2 size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      emptyMessage="Nenhuma loja cadastrada ainda."
      getRowKey={(store) => store.id}
    />
  );
}
