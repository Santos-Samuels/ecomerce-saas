import { ActionIcon, Box, Group, Text, Tooltip } from "@mantine/core";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IProductMaterial } from "@ecomerce/shared";
import { DataTable, DataTableColumn } from "@/components/ui/DataTable";

interface MaterialsTableProps {
  materials: IProductMaterial[];
  loading: boolean;
  deletingId?: string;
  onEdit(material: IProductMaterial): void;
  onDelete(material: IProductMaterial): void;
}

export function MaterialsTable({
  materials,
  loading,
  deletingId,
  onEdit,
  onDelete,
}: MaterialsTableProps) {
  const columns: DataTableColumn<IProductMaterial>[] = [
    {
      key: "name",
      header: "Nome",
      render: (material) => (
        <Text size="sm" fw={500} lineClamp={1} title={material.name}>
          {material.name}
        </Text>
      ),
    },
    {
      key: "color",
      header: "Cor",
      render: (material) => {
        const colorTitle = material.colorName ?? material.colorHex ?? "";

        return material.colorName || material.colorHex ? (
          <Group gap="xs">
            {material.colorHex && (
              <Box
                w={20}
                h={20}
                style={{
                  borderRadius: 4,
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  backgroundColor: material.colorHex,
                  flexShrink: 0,
                }}
              />
            )}
            <Box style={{ minWidth: 0 }}>
              {material.colorName && (
                <Text size="sm" fw={500} lineClamp={1} title={colorTitle}>
                  {material.colorName}
                </Text>
              )}
            </Box>
          </Group>
        ) : (
          <Text size="xs" c="dimmed">
            Sem cor definida
          </Text>
        );
      },
    },
    {
      key: "description",
      header: "Descrição",
      render: (material) => (
        <Text
          size="xs"
          c="dimmed"
          lineClamp={2}
          title={material.description ?? ""}
        >
          {material.description}
        </Text>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      align: "right",
      width: 120,
      render: (material) => (
        <Group gap={4} justify="flex-end">
          <Tooltip label="Editar material" withArrow>
            <ActionIcon
              variant="subtle"
              size="sm"
              aria-label="Editar material"
              onClick={() => onEdit(material)}
            >
              <FiEdit2 size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Remover material" withArrow>
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              aria-label="Remover material"
              disabled={deletingId === material.id}
              onClick={() => onDelete(material)}
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
      data={materials}
      columns={columns}
      loading={loading}
      emptyMessage="Nenhum material cadastrado ainda."
      getRowKey={(material) => material.id}
    />
  );
}
