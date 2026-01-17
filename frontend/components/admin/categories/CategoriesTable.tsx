import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IProductCategory } from "@ecomerce/shared";
import { DataTable, DataTableColumn } from "@/components/ui/DataTable";

interface CategoriesTableProps {
  categories: IProductCategory[];
  loading: boolean;
  deletingId?: string;
  onEdit(category: IProductCategory): void;
  onDelete(category: IProductCategory): void;
}

export function CategoriesTable({
  categories,
  loading,
  deletingId,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  const columns: DataTableColumn<IProductCategory>[] = [
    {
      key: "name",
      header: "Nome",
      render: (category) => (
        <Text size="sm" fw={500} lineClamp={1} title={category.name}>
          {category.name}
        </Text>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      render: (category) => (
        <Text size="xs" c="dimmed" lineClamp={1} title={category.slug}>
          {category.slug}
        </Text>
      ),
    },
    {
      key: "description",
      header: "Descrição",
      render: (category) => (
        <Text
          size="xs"
          c="dimmed"
          lineClamp={2}
          title={category.description ?? ""}
        >
          {category.description}
        </Text>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      align: "right",
      width: 120,
      render: (category) => (
        <Group gap={4} justify="flex-end">
          <Tooltip label="Editar categoria" withArrow>
            <ActionIcon
              variant="subtle"
              size="sm"
              aria-label="Editar categoria"
              onClick={() => onEdit(category)}
            >
              <FiEdit2 size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Remover categoria" withArrow>
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              aria-label="Remover categoria"
              disabled={deletingId === category.id}
              onClick={() => onDelete(category)}
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
      data={categories}
      columns={columns}
      loading={loading}
      emptyMessage="Nenhuma categoria cadastrada ainda."
      getRowKey={(category) => category.id}
    />
  );
}
