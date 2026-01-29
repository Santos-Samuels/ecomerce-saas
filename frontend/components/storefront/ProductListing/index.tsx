import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPublicCategories,
  fetchPublicProducts,
  fetchPublicVehicles,
} from "@/store/storefront/storefrontSlice";
import { FilterProductDto } from "@/store/storefront/types";
import { Container, Grid, LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { ProductFilters } from "../ProductFilters";
import { ProductGrid } from "../ProductGrid";
import { ListingWrapper } from "./styles";

interface ProductListingProps {
  primaryColor?: string | null;
}

export function ProductListing({ primaryColor }: ProductListingProps) {
  const dispatch = useAppDispatch();
  const { products, categories, vehicles } = useAppSelector(
    (state) => state.storefront
  );

  const [filters, setFilters] = useState<FilterProductDto>({});
  const [debouncedSearch] = useDebouncedValue(filters.search, 500);

  useEffect(() => {
    dispatch(fetchPublicCategories());
    dispatch(fetchPublicVehicles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchPublicProducts({
        categoryId: filters.categoryId,
        vehicleId: filters.vehicleId,
        search: debouncedSearch,
      })
    );
  }, [dispatch, debouncedSearch, filters.categoryId, filters.vehicleId]);

  const handleFilterChange = (key: string, value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const isLoading =
    products.loading || categories.loading || vehicles.loading;

  return (
    <ListingWrapper>
      <Container size="xl">
        <Grid>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <ProductFilters
              categories={categories.items}
              vehicles={vehicles.items}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 9 }}>
            <div style={{ position: "relative", minHeight: 200 }}>
              <LoadingOverlay visible={isLoading} />
              <ProductGrid
                products={products.items}
                primaryColor={primaryColor}
                withoutContainer
              />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </ListingWrapper>
  );
}
