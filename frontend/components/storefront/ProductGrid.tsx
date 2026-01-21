import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Card,
  SimpleGrid,
  Badge,
  Image as MantineImage,
} from "@mantine/core";
import { FiShoppingBag } from "react-icons/fi";
import { IProduct } from "@ecomerce/shared";

interface ProductGridProps {
  products: IProduct[];
  primaryColor?: string | null;
}

export function ProductGrid({ products, primaryColor }: ProductGridProps) {
  return (
    <Container size="lg" py={60}>
      <Title order={2} mb="xl">
        Nossos Produtos
      </Title>

      {products.length === 0 ? (
        <div
          style={{ textAlign: "center", padding: "60px 0", color: "#868e96" }}
        >
          <FiShoppingBag size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
          <Text size="lg">Nenhum produto disponível no momento.</Text>
        </div>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
          {products.map((product) => (
            <Card
              key={product.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section>
                <div
                  style={{
                    height: 200,
                    backgroundColor: "#f1f3f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {product.images?.[0] ? (
                    <MantineImage
                      src={product.images[0]}
                      h={200}
                      w="100%"
                      fit="cover"
                    />
                  ) : (
                    <FiShoppingBag size={40} color="#adb5bd" />
                  )}
                </div>
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={600} lineClamp={1} title={product.name}>
                  {product.name}
                </Text>
              </Group>

              <Group mb="md">
                <Badge color="green" size="lg" variant="light">
                  R$ {Number(product.price).toFixed(2)}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed" lineClamp={2} h={40}>
                {product.description}
              </Text>

              <Button
                fullWidth
                mt="md"
                radius="md"
                color={primaryColor || "blue"}
              >
                Ver Detalhes
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
