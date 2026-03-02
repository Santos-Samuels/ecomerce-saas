import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPublicProducts } from "@/store/storefront/storefrontSlice";
import { Container, LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";
import { ProductGrid } from "../../common/ProductGrid";
import { ListingWrapper } from "./styles";

interface ProductListingProps {
  primaryColor?: string | null;
}

export function ProductListing({ primaryColor }: ProductListingProps) {
  const { products } = useAppSelector((state) => state.storefront);

  const isLoading = products.loading;

  if (!products.loading && products.items.length === 0) {
    return null;
  }

  return (
    <ListingWrapper>
      <Container size="xl">
        <div style={{ position: "relative", minHeight: 200 }}>
          <LoadingOverlay visible={isLoading} />
          <ProductGrid
            products={products.items}
            primaryColor={primaryColor}
            withoutContainer
            title="Destaques"
          />
        </div>
      </Container>
    </ListingWrapper>
  );
}
