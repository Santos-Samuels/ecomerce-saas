import { ReactNode } from "react";
import { Table, Text } from "@mantine/core";
import { TableContainer } from "../admin/layout/TableContainer";

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  width?: number | string;
  align?: "left" | "right" | "center";
  render: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  getRowKey?: (item: T) => string;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  emptyMessage,
  getRowKey,
}: DataTableProps<T>) {
  const colSpan = columns.length || 1;

  const getTextAlign = (align?: "left" | "right" | "center") => {
    if (align === "right") return "right";
    if (align === "center") return "center";
    return undefined;
  };

  const internalGetRowKey = (item: T): string => {
    if (getRowKey) return getRowKey(item);
    return (item as any).id || (item as any)._id || Math.random().toString();
  };

  return (
    <TableContainer>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th
                key={column.key}
                style={{
                  textAlign: getTextAlign(column.align),
                  width: column.width,
                }}
              >
                {column.header}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.length === 0 && !loading && emptyMessage && (
            <Table.Tr>
              <Table.Td colSpan={colSpan}>
                <Text size="sm" c="dimmed">
                  {emptyMessage}
                </Text>
              </Table.Td>
            </Table.Tr>
          )}

          {data.map((item, index) => (
            <Table.Tr key={internalGetRowKey(item) || index}>
              {columns.map((column) => (
                <Table.Td
                  key={column.key}
                  style={{
                    textAlign: getTextAlign(column.align),
                    width: column.width,
                  }}
                >
                  {column.render(item)}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </TableContainer>
  );
}

