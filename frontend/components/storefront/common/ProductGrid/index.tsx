import { addToCart } from "@/store/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { IProduct } from "@ecomerce/shared";
import {
    ActionIcon,
    Badge,
    Button,
    Card,
    Container,
    Group,
    Image as MantineImage,
    SimpleGrid,
    Text,
    Title,
    Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { FiCheck, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
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
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent, product: IProduct) => {
    e.preventDefault(); // Evita navegar para os detalhes
    dispatch(addToCart({ product, color: null }));
    notifications.show({
      title: 'Produto adicionado',
      message: `${product.name} foi adicionado ao carrinho`,
      color: 'green',
      icon: <FiCheck size={18} />,
    });
  };

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

            <Group mt="md" gap="xs">
              <Button
                component={Link}
                href={`/products/${product.slug}`}
                flex={1}
                radius="md"
                color={primaryColor || "blue"}
              >
                Ver Detalhes
              </Button>
              
              <Tooltip label="Adicionar ao carrinho">
                <ActionIcon 
                  size="lg" 
                  radius="md" 
                  variant="filled" 
                  color={primaryColor || "blue"}
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={!product.infiniteStock && product.stock <= 0}
                >
                  <FiShoppingCart size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
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
