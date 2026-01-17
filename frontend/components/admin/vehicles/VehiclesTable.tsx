import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IVehicle } from "@ecomerce/shared";
import { DataTable, DataTableColumn } from "@/components/ui/DataTable";

interface VehiclesTableProps {
  data: IVehicle[];
  onEdit: (vehicle: IVehicle) => void;
  onDelete: (id: string) => void;
}

export function VehiclesTable({ data, onEdit, onDelete }: VehiclesTableProps) {
  const columns: DataTableColumn<IVehicle>[] = [
    {
      key: "make",
      header: "Fabricante",
      render: (vehicle) => (
        <Text size="sm" fw={500}>
          {vehicle.make}
        </Text>
      ),
    },
    {
      key: "model",
      header: "Modelo",
      render: (vehicle) => <Text size="sm">{vehicle.model}</Text>,
    },
    {
      key: "year",
      header: "Ano",
      render: (vehicle) => <Text size="sm">{vehicle.year}</Text>,
    },
    {
      key: "type",
      header: "Tipo",
      render: (vehicle) => <Text size="sm">{vehicle.type}</Text>,
    },
    {
      key: "actions",
      header: "Ações",
      align: "right",
      width: 120,
      render: (vehicle) => (
        <Group gap={4} justify="flex-end">
          <Tooltip label="Editar">
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => onEdit(vehicle)}
            >
              <FiEdit2 size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Excluir">
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(vehicle.id)}
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
      emptyMessage="Nenhum veículo cadastrado ainda."
      getRowKey={(item) => item.id}
    />
  );
}
