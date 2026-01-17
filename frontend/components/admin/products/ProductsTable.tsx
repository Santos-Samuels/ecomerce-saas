import {
  ActionIcon,
  Badge,
  Group,
  Text,
  Tooltip,
  NumberFormatter,
} from "@mantine/core";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IProduct } from "@ecomerce/shared";
import { DataTable, DataTableColumn } from "@/components/ui/DataTable";

interface ProductsTableProps {
  data: IProduct[];
  onEdit: (product: IProduct) => void;
  onDelete: (id: string) => void;
}

export function ProductsTable({ data, onEdit, onDelete }: ProductsTableProps) {
  const columns: DataTableColumn<IProduct>[] = [
    {
      key: "product",
      header: "Produto",
      render: (product) => (
        <>
          <Text size="sm" fw={500}>
            {product.name}
          </Text>
          <Text size="xs" c="dimmed">
            SKU: {product.sku}
          </Text>
        </>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (product) => (
        <>
          <Badge
            color={product.active ? "green" : "gray"}
            variant="light"
            size="sm"
          >
            {product.active ? "Ativo" : "Inativo"}
          </Badge>
          {product.featured && (
            <Badge color="yellow" variant="light" size="sm" ml={4}>
              Destaque
            </Badge>
          )}
        </>
      ),
    },
    {
      key: "price",
      header: "Preço",
      render: (product) => {
        if (product.promotionalPrice) {
          return (
            <>
              <Text size="sm" c="green" fw={600}>
                <NumberFormatter
                  prefix="R$ "
                  value={product.promotionalPrice}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                />
              </Text>
              <Text size="xs" c="dimmed" td="line-through">
                <NumberFormatter
                  prefix="R$ "
                  value={product.price}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                />
              </Text>
            </>
          );
        }

        return (
          <Text size="sm">
            <NumberFormatter
              prefix="R$ "
              value={product.price}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
            />
          </Text>
        );
      },
    },
    {
      key: "stock",
      header: "Estoque",
      render: (product) => (
        <Text size="sm">
          {product.infiniteStock ? "infinito" : product.stock}
        </Text>
      ),
    },
    {
      key: "category",
      header: "Categoria",
      render: (product) => (
        <Text size="sm">{product.category?.name || "-"}</Text>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      align: "right",
      width: 120,
      render: (product) => (
        <Group gap="xs" justify="flex-end">
          <Tooltip label="Editar">
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => onEdit(product)}
            >
              <FiEdit2 size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Excluir">
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(product.id)}
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
      emptyMessage="Nenhum produto cadastrado ainda."
      getRowKey={(product) => product.id}
    />
  );
}
