import { Center, Stack, Text, Title } from "@mantine/core";

interface ProductsEmptyStateProps {
  hasFilters?: boolean;
}

export function ProductsEmptyState({ hasFilters }: ProductsEmptyStateProps) {
  return (
    <Center py="xl">
      <Stack align="center" gap="md">
        <Title order={3}>
          {hasFilters ? "Nenhum produto encontrado" : "Ainda não há produtos cadastrados"}
        </Title>
        <Text c="dimmed">
          {hasFilters
            ? "Tente ajustar os filtros ou buscar por outro termo."
            : "Fique atento, em breve teremos novidades!"}
        </Text>
      </Stack>
    </Center>
  );
}
