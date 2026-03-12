import { addToCart } from "@/store/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { IProduct } from "@ecomerce/shared";
import {
  ActionIcon,
  Box,
  Card,
  Container,
  Image as MantineImage,
  SimpleGrid,
  Title,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { FiCheck, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import {
  CardWrapper,
  CurrentPrice,
  DiscountBadge,
  FreeShipping,
  OldPrice,
  PriceWrapper,
  ProductImageWrapper,
  ProductTitle
} from "./styles";

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
    e.stopPropagation(); // Evita navegar para os detalhes ao clicar no botão
    e.preventDefault();
    dispatch(addToCart({ product, color: null }));
    notifications.show({
      title: 'Produto adicionado',
      message: `${product.name} foi adicionado ao carrinho`,
      color: 'green',
      icon: <FiCheck size={18} />,
    });
  };

  const calculateDiscount = (price: number, promotionalPrice: number) => {
    return Math.round(((price - promotionalPrice) / price) * 100);
  };

  if (products.length === 0) return null;

  const content = (
    <>
      {title && (
        <Title order={2} mb="xl">
          {title}
        </Title>
      )}

      <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 4 }} spacing="md">
        {products.map((product) => {
          const discount = product.promotionalPrice
            ? calculateDiscount(Number(product.price), Number(product.promotionalPrice))
            : null;

          return (
            <CardWrapper key={product.id}>
              <Card
                component={Link}
                href={`/products/${product.slug}`}
                padding="md"
                radius="sm"
                shadow="none"
                withBorder={false}
              >
                <Card.Section>
                  <ProductImageWrapper>
                    {discount && <DiscountBadge>{discount}% OFF</DiscountBadge>}
                    {product.images?.[0] ? (
                      <MantineImage
                        src={product.images[0]}
                        h={180}
                        w="100%"
                        fit="contain"
                      />
                    ) : (
                      <FiShoppingBag size={40} color="#eee" />
                    )}
                  </ProductImageWrapper>
                </Card.Section>

                <Box mt="md" style={{ flex: 1, position: 'relative' }}>
                  <ProductTitle>{product.name}</ProductTitle>

                  <PriceWrapper>
                    {product.promotionalPrice ? (
                      <>
                        <OldPrice>R$ {Number(product.price).toFixed(2)}</OldPrice>
                        <CurrentPrice>
                          <span style={{ fontSize: '14px', alignSelf: 'flex-start', marginTop: '4px' }}>R$</span>
                          {Number(product.promotionalPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </CurrentPrice>
                      </>
                    ) : (
                      <CurrentPrice>
                        <span style={{ fontSize: '14px', alignSelf: 'flex-start', marginTop: '4px' }}>R$</span>
                        {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </CurrentPrice>
                    )}
                  </PriceWrapper>

                  <FreeShipping>Frete grátis</FreeShipping>
                  
                  <Tooltip label="Adicionar ao carrinho">
                    <ActionIcon
                      variant="subtle"
                      color={primaryColor || "blue"}
                      onClick={(e) => handleAddToCart(e, product)}
                      size="lg"
                      style={{ position: 'absolute', bottom: 0, right: 0 }}
                    >
                      <FiShoppingCart size={20} />
                    </ActionIcon>
                  </Tooltip>
                </Box>
              </Card>
            </CardWrapper>
          );
        })}
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

