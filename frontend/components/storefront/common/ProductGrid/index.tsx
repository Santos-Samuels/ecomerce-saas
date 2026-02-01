import { IProduct } from "@ecomerce/shared";
import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Image as MantineImage,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { ProductImageWrapper } from "./styles";

interface ProductGridProps {
  products: IProduct[];
  primaryColor?: string | null;
  title?: string;
  withoutContainer?: boolean;
}

export function ProductGrid({
  products,
  primaryColor,
  title,
  withoutContainer,
}: ProductGridProps) {
  if (products.length === 0) return null;

  const content = (
    <>
      <Title order={2} mb="xl">
        {title || "Nossos Produtos"}
      </Title>

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
              <ProductImageWrapper>
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
              </ProductImageWrapper>
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
              component={Link}
              href={`/products/${product.slug}`}
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
    </>
  );

  if (withoutContainer) {
    return <div>{content}</div>;
  }

  return (
    <Container size="lg" py={60}>
      {content}
    </Container>
  );
}
