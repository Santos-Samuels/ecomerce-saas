"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPublicProductBySlug } from "@/store/storefront/storefrontSlice";
import { Badge, Button, LoadingOverlay, Image as MantineImage, Text } from "@mantine/core";
import { useEffect } from "react";
import { FiMessageCircle, FiShoppingBag } from "react-icons/fi";
import {
  Category,
  ChipWrapper,
  Container,
  Description,
  Grid,
  Header,
  ImageWrapper,
  InfoWrapper,
  OldPrice,
  Price,
  PriceWrapper,
  SectionTitle,
  Title,
} from "./styles";

interface ProductDetailsProps {
  slug: string;
  primaryColor?: string | null;
  whatsappNumber?: string | null;
}

export function ProductDetails({
  slug,
  whatsappNumber,
}: ProductDetailsProps) {
  const dispatch = useAppDispatch();
  const { currentProduct, loading, notFound } = useAppSelector(
    (state) => state.storefront.products
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchPublicProductBySlug(slug));
    }
  }, [dispatch, slug]);

  if (loading) {
    return (
      <Container>
        <div style={{ position: "relative", minHeight: 400 }}>
           <LoadingOverlay visible={true} />
        </div>
      </Container>
    );
  }

  if (notFound) {
    return (
      <Container>
        <Text size="xl" ta="center" mt="xl">
          Produto não encontrado
        </Text>
      </Container>
    );
  }

  if (!currentProduct) return null;

  const product = currentProduct;
  const hasPromo =
    product.promotionalPrice && product.promotionalPrice < product.price;

  const handleWhatsappClick = () => {
    if (!whatsappNumber) return;
    const message = `Olá! Gostaria de saber mais sobre o produto: ${product.name}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Container>
      <Grid>
        <ImageWrapper>
          {product.images?.[0] ? (
            <MantineImage
              src={product.images[0]}
              alt={product.name}
              fit="contain"
              h={500}
              w="100%"
            />
          ) : (
            <FiShoppingBag size={80} color="#adb5bd" />
          )}
        </ImageWrapper>

        <InfoWrapper>
          <Header>
            <Category>
              {product.category?.name || "Sem Categoria"}
            </Category>
            <Title>{product.name}</Title>
          </Header>

          <PriceWrapper>
            {hasPromo ? (
              <>
                <Price>
                  R$ {Number(product.promotionalPrice).toFixed(2)}
                </Price>
                <OldPrice>R$ {Number(product.price).toFixed(2)}</OldPrice>
              </>
            ) : (
              <Price>R$ {Number(product.price).toFixed(2)}</Price>
            )}
          </PriceWrapper>

          <Description>{product.description}</Description>

          {product.compatibleVehicles && product.compatibleVehicles.length > 0 && (
            <div>
              <SectionTitle>Veículos Compatíveis</SectionTitle>
              <ChipWrapper>
                {product.compatibleVehicles.map((v) => (
                  <Badge key={v.id} variant="light" size="lg">
                    {v.make} {v.model} - {v.year}
                  </Badge>
                ))}
              </ChipWrapper>
            </div>
          )}

          {whatsappNumber && (
            <Button
              leftSection={<FiMessageCircle size={20} />}
              size="lg"
              color="green"
              onClick={handleWhatsappClick}
              mt="xl"
            >
              Tenho Interesse
            </Button>
          )}
        </InfoWrapper>
      </Grid>
    </Container>
  );
}
