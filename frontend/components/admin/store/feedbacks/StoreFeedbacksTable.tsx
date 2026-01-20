import { ActionIcon, Group, Rating, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "@/components/ui/DataTable";
import { IStoreFeedback } from "@ecomerce/shared";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface StoreFeedbacksTableProps {
  data: IStoreFeedback[];
  loading: boolean;
  onEdit: (feedback: IStoreFeedback) => void;
  onDelete: (id: string) => void;
  deletingId?: string;
}

export function StoreFeedbacksTable({
  data,
  loading,
  onEdit,
  onDelete,
  deletingId,
}: StoreFeedbacksTableProps) {
  const columns: DataTableColumn<IStoreFeedback>[] = [
    {
      key: "customerName",
      header: "Cliente",
      render: (record) => <Text size="sm">{record.customerName}</Text>,
    },
    {
      key: "stars",
      header: "Avaliação",
      render: (record) => <Rating value={record.stars} readOnly size="sm" />,
    },
    {
      key: "comment",
      header: "Comentário",
      width: 400,
      render: (record) => (
        <Text size="sm" lineClamp={2}>
          {record.comment}
        </Text>
      ),
    },
    {
      key: "createdAt",
      header: "Data",
      width: 120,
      render: (record) => (
        <Text size="sm">
          {new Date(record.createdAt).toLocaleDateString("pt-BR")}
        </Text>
      ),
    },
    {
      key: "actions",
      header: "Ações",
      width: 100,
      align: "right",
      render: (record) => (
        <Group gap={4} justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => onEdit(record)}
          >
            <FiEdit2 size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            loading={deletingId === record.id}
            onClick={() => onDelete(record.id)}
          >
            <FiTrash2 size={16} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      loading={loading}
      columns={columns}
      getRowKey={(item) => item.id}
      emptyMessage="Nenhum feedback cadastrado."
    />
  );
}
