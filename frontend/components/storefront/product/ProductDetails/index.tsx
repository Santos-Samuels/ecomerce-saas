"use client";

import { addToCart } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPublicProductBySlug } from "@/store/storefront/storefrontSlice";
import { Badge, Button, LoadingOverlay, Image as MantineImage, Tabs, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { FiCheck, FiInfo, FiShoppingBag, FiShoppingCart, FiTruck } from "react-icons/fi";
import {
    Container,
    Description,
    Grid,
    Header,
    ImageWrapper,
    InfoWrapper,
    OldPrice,
    Price,
    PriceWrapper,
    SpecsTable,
    ThumbnailItem,
    ThumbnailsGrid,
    Title,
    VehicleList
} from "./styles";

interface ProductDetailsProps {
  slug: string;
  primaryColor?: string | null;
  whatsappNumber?: string | null;
}

export function ProductDetails({
  slug,
  whatsappNumber,
  primaryColor,
}: ProductDetailsProps) {
  const dispatch = useAppDispatch();
  const { currentProduct, loading, notFound } = useAppSelector(
    (state) => state.storefront.products
  );
  
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedColorHex, setSelectedColorHex] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      dispatch(fetchPublicProductBySlug(slug));
    }
  }, [dispatch, slug]);

  if (loading) {
    return (
      <Container>
        <div style={{ position: "relative", minHeight: 400 }}>
           <LoadingOverlay visible={true} overlayProps={{ radius: "sm", blur: 2 }} />
        </div>
      </Container>
    );
  }

  if (notFound) {
    return (
      <Container>
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <FiInfo size={48} color="#adb5bd" style={{ marginBottom: "1rem" }} />
          <Text size="xl" fw={500}>
            Produto não encontrado
          </Text>
          <Text c="dimmed">
            O produto que você está procurando pode ter sido removido ou não existe.
          </Text>
        </div>
      </Container>
    );
  }

  if (!currentProduct) return null;

  const product = currentProduct;
  const hasPromo =
    product.promotionalPrice && product.promotionalPrice < product.price;

  const selectedColor =
    product.colors?.find((c) => c.hex === selectedColorHex) ?? null;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, color: selectedColor }));
    notifications.show({
      title: 'Produto adicionado',
      message: `${product.name}${selectedColor ? ` (${selectedColor.name})` : ""} foi adicionado ao carrinho`,
      color: 'green',
      icon: <FiCheck size={18} />,
    });
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Container>
      <Grid>
        <div>
          <ImageWrapper>
            {activeImage ?? product.images?.[0] ? (
              <MantineImage
                src={activeImage ?? product.images?.[0]}
                alt={product.name}
                fit="contain"
                h={400}
                w="100%"
                fallbackSrc="https://placehold.co/600x400?text=Sem+Imagem"
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#adb5bd' }}>
                <FiShoppingBag size={64} />
                <Text mt="md">Sem imagem disponível</Text>
              </div>
            )}
          </ImageWrapper>

          {product.images && product.images.length > 1 && (
            <ThumbnailsGrid>
              {product.images.map((img, index) => (
                <ThumbnailItem 
                  key={index} 
                  active={activeImage ? activeImage === img : index === 0}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`${product.name} - ${index + 1}`} />
                </ThumbnailItem>
              ))}
            </ThumbnailsGrid>
          )}
        </div>

        <InfoWrapper>
          <Header>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
               {product.category && (
                 <Badge color="blue" variant="light" size="lg">
                   {product.category.name}
                 </Badge>
               )}
               {product.infiniteStock || product.stock > 0 ? (
                 <Badge color="green" variant="light" size="lg" leftSection={<FiCheck />}>
                   Em Estoque
                 </Badge>
               ) : (
                 <Badge color="red" variant="light" size="lg">
                   Esgotado
                 </Badge>
               )}
            </div>
            
            <Title>{product.name}</Title>
            <Text c="dimmed" size="sm">SKU: {product.sku}</Text>
          </Header>

          <PriceWrapper>
            {hasPromo ? (
              <>
                <OldPrice>{formatPrice(product.price)}</OldPrice>
                <Price>{formatPrice(product.promotionalPrice!)}</Price>
                <Badge color="green" variant="filled" size="lg" ml="sm">
                  {Math.round(((product.price - product.promotionalPrice!) / product.price) * 100)}% OFF
                </Badge>
              </>
            ) : (
              <Price>{formatPrice(product.price)}</Price>
            )}
          </PriceWrapper>

          {product.colors && product.colors.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <Text size="sm" fw={500} mb={4}>
                Cores disponíveis
              </Text>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {product.colors.map((color) => {
                  const isActive = selectedColorHex === color.hex;
                  return (
                    <button
                      key={`${color.name}-${color.hex}`}
                      type="button"
                      onClick={() => setSelectedColorHex(color.hex)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 10px',
                        borderRadius: 999,
                        border: isActive
                          ? `2px solid ${primaryColor || '#228be6'}`
                          : '1px solid #dee2e6',
                        backgroundColor: isActive ? '#f1f3f5' : '#fff',
                        cursor: 'pointer',
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          backgroundColor: color.hex,
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                      />
                      <span style={{ fontSize: 13 }}>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#868e96' }}>
             <FiTruck />
             <Text size="sm">Consulte o frete e prazo de entrega no checkout</Text>
          </div>

          <Button
            leftSection={<FiShoppingCart size={24} />}
            size="xl"
            color={primaryColor || "blue"}
            onClick={handleAddToCart}
            fullWidth
            mt="md"
            disabled={!product.infiniteStock && product.stock <= 0}
          >
            {(!product.infiniteStock && product.stock <= 0) ? 'Produto Indisponível' : 'Adicionar ao Carrinho'}
          </Button>

          <Tabs defaultValue="description" mt="xl">
            <Tabs.List>
              <Tabs.Tab value="description">Descrição</Tabs.Tab>
              <Tabs.Tab value="specs">Ficha Técnica</Tabs.Tab>
              {product.compatibleVehicles && product.compatibleVehicles.length > 0 && (
                <Tabs.Tab value="vehicles">Compatibilidade</Tabs.Tab>
              )}
            </Tabs.List>

            <Tabs.Panel value="description" pt="lg">
              <Description>
                {product.description || "Nenhuma descrição disponível para este produto."}
              </Description>
            </Tabs.Panel>

            <Tabs.Panel value="specs" pt="lg">
              <SpecsTable>
                <tbody>
                  <tr>
                    <th>SKU</th>
                    <td>{product.sku}</td>
                  </tr>
                  <tr>
                    <th>Categoria</th>
                    <td>{product.category?.name || '-'}</td>
                  </tr>
                  {product.material && (
                    <tr>
                      <th>Material</th>
                      <td>{product.material.name}</td>
                    </tr>
                  )}
                </tbody>
              </SpecsTable>
            </Tabs.Panel>

            <Tabs.Panel value="vehicles" pt="lg">
              <VehicleList>
                {product.compatibleVehicles?.map((vehicle) => (
                  <li key={vehicle.id}>
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                  </li>
                ))}
              </VehicleList>
            </Tabs.Panel>
          </Tabs>
        </InfoWrapper>
      </Grid>
    </Container>
  );
}
