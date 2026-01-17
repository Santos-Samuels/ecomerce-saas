import { ActionIcon, Box, Group, Table, Text, Tooltip } from "@mantine/core";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IProductMaterial } from "@ecomerce/shared";

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
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Cor</Table.Th>
          <Table.Th>Descrição</Table.Th>
          <Table.Th w={120} style={{ textAlign: "right" }}>
            Ações
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {materials.length === 0 && !loading && (
          <Table.Tr>
            <Table.Td colSpan={4}>
              <Text size="sm" c="dimmed">
                Nenhum material cadastrado ainda.
              </Text>
            </Table.Td>
          </Table.Tr>
        )}

        {materials.map((material) => {
          const colorTitle = material.colorName ?? material.colorHex ?? "";

          return (
            <Table.Tr key={material.id}>
              <Table.Td title={material.name}>
                <Text size="sm" fw={500} lineClamp={1}>
                  {material.name}
                </Text>
              </Table.Td>
              <Table.Td title={colorTitle}>
                {material.colorName || material.colorHex ? (
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
                        <Text size="sm" fw={500} lineClamp={1}>
                          {material.colorName}
                        </Text>
                      )}
                    </Box>
                  </Group>
                ) : (
                  <Text size="xs" c="dimmed">
                    Sem cor definida
                  </Text>
                )}
              </Table.Td>
              <Table.Td title={material.description ?? ""}>
                <Text size="xs" c="dimmed" lineClamp={2}>
                  {material.description}
                </Text>
              </Table.Td>
              <Table.Td>
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
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
