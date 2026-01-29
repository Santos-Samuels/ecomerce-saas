"use client";

import { ProductFilters } from "@/components/storefront/common/ProductFilters";
import { MobileFilterButton } from "@/components/storefront/common/ProductFilters/styles";
import { ProductGrid } from "@/components/storefront/common/ProductGrid";
import { StoreFooter } from "@/components/storefront/common/StoreFooter";
import { StoreNotFound } from "@/components/storefront/common/StoreNotFound";
import { BaseScreen } from "@/components/storefront/common/layout/BaseScreen";
import { MainContent } from "@/components/storefront/common/layout/styles";
import { ProductsEmptyState } from "@/components/storefront/products/ProductsEmptyState";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCurrentStore,
  fetchPublicCategories,
  fetchPublicProducts,
  fetchPublicVehicles,
} from "@/store/storefront/storefrontSlice";
import { FilterProductDto } from "@/store/storefront/types";
import { Drawer, LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  gap: 32px;
  position: relative;
`;

const Sidebar = styled.aside`
  width: 280px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  flex: 1;
`;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const {
    products,
    categories,
    vehicles,
    store: { data: store, loading: storeLoading, notFound: storeNotFound },
  } = useAppSelector((state) => state.storefront);

  const [subdomainInput, setSubdomainInput] = useState("");
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter State
  const [filters, setFilters] = useState<FilterProductDto>({
    categoryId: searchParams.get("category") || undefined,
    vehicleId: searchParams.get("vehicle") || undefined,
    search: searchParams.get("search") || "",
  });

  const [debouncedSearch] = useDebouncedValue(filters.search, 500);

  useEffect(() => {
    // Set initial subdomain input from current URL
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (
        hostname.includes(".localhost") ||
        (hostname !== "localhost" && !hostname.includes("verel.app"))
      ) {
        setSubdomainInput(hostname.split(".")[0]); // eslint-disable-line react-hooks/set-state-in-effect
      }
    }
    dispatch(fetchCurrentStore());
  }, [dispatch]);

  const hasFilters = filters.categoryId || filters.vehicleId || filters.search;
  const showFilters = products.items.length > 0 || hasFilters;

  useEffect(() => {
    if (showFilters) {
      dispatch(fetchPublicCategories());
      dispatch(fetchPublicVehicles());
    }
  }, [dispatch, showFilters]);

  // Effect to load products when filters change (debounced search)
  useEffect(() => {
    if (store) {
      dispatch(
        fetchPublicProducts({
          categoryId: filters.categoryId,
          vehicleId: filters.vehicleId,
          search: debouncedSearch,
        })
      );
    }
  }, [dispatch, debouncedSearch, filters.categoryId, filters.vehicleId, store]);

  const handleFilterChange = (key: string, value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      categoryId: undefined,
      vehicleId: undefined,
      search: "",
    });
  };

  const handleSimulate = () => {
    if (!subdomainInput) return;
    const protocol = window.location.protocol;
    if (subdomainInput === "localhost") {
      window.location.href = `${protocol}//localhost:3000`;
      return;
    }
    const newUrl = `${protocol}//${subdomainInput}.localhost:3000`;
    window.location.href = newUrl;
  };

  if (storeLoading) return <LoadingOverlay visible />;

  if (storeNotFound) {
    return (
      <StoreNotFound
        subdomainInput={subdomainInput}
        setSubdomainInput={setSubdomainInput}
        handleSimulate={handleSimulate}
      />
    );
  }

  return (
    <BaseScreen
      store={store}
      footer={
        <div id="contact">
          <StoreFooter
            store={store}
            subdomainInput={subdomainInput}
            setSubdomainInput={setSubdomainInput}
            handleSimulate={handleSimulate}
          />
        </div>
      }
    >
      <MainContent>
        <PageContainer>
          {showFilters && (
            <Sidebar>
              <ProductFilters
                categories={categories.items}
                vehicles={vehicles.items}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </Sidebar>
          )}

          <Content>
            {showFilters && (
              <MobileFilterButton onClick={() => setMobileFiltersOpen(true)}>
                <FiFilter size={18} />
                Filtrar Produtos
              </MobileFilterButton>
            )}
            
            <div style={{ position: 'relative', minHeight: 200 }}>
                <LoadingOverlay visible={products.loading} overlayProps={{ opacity: 0.1, blur: 1 }} />
                
                {products.items.length > 0 ? (
                  <ProductGrid 
                      products={products.items} 
                      primaryColor={store?.primaryColor} 
                      title={
                          filters.search 
                          ? `Resultados para "${filters.search}"` 
                          : "Todos os Produtos"
                      }
                  />
                ) : (
                  !products.loading && (
                    <ProductsEmptyState hasFilters={!!hasFilters} />
                  )
                )}
            </div>
          </Content>
        </PageContainer>
      </MainContent>

      <Drawer
        opened={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filtrar Produtos"
        padding="md"
        size="md"
      >
        <ProductFilters
          categories={categories.items}
          vehicles={vehicles.items}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={() => {
            handleClearFilters();
            setMobileFiltersOpen(false);
          }}
        />
      </Drawer>
    </BaseScreen>
  );
}
