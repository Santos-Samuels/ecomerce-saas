import { ActionIcon, Group, Table, Text, Tooltip } from "@mantine/core";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IProductCategory } from "@ecomerce/shared";

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
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Slug</Table.Th>
          <Table.Th>Descrição</Table.Th>
          <Table.Th w={120} style={{ textAlign: "right" }}>
            Ações
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {categories.length === 0 && !loading && (
          <Table.Tr>
            <Table.Td colSpan={4}>
              <Text size="sm" c="dimmed">
                Nenhuma categoria cadastrada ainda.
              </Text>
            </Table.Td>
          </Table.Tr>
        )}

        {categories.map((category) => (
          <Table.Tr key={category.id}>
            <Table.Td title={category.name}>
              <Text size="sm" fw={500} lineClamp={1}>
                {category.name}
              </Text>
            </Table.Td>
            <Table.Td title={category.slug}>
              <Text size="xs" c="dimmed" lineClamp={1}>
                {category.slug}
              </Text>
            </Table.Td>
            <Table.Td title={category.description ?? ""}>
              <Text size="xs" c="dimmed" lineClamp={2}>
                {category.description}
              </Text>
            </Table.Td>
            <Table.Td>
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
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
