"use client";

import { LandingPage } from "@/components/landing/LandingPage";
import { StoreFooter } from "@/components/storefront/common/StoreFooter";
import { StoreNotFound } from "@/components/storefront/common/StoreNotFound";
import { BaseScreen } from "@/components/storefront/common/layout/BaseScreen";
import { MainContent } from "@/components/storefront/common/layout/styles";
import { AboutSection } from "@/components/storefront/home/AboutSection";
import { CategorySection } from "@/components/storefront/home/CategorySection";
import { FeedbackSection } from "@/components/storefront/home/FeedbackSection";
import { HeroSection } from "@/components/storefront/home/HeroSection";
import { ProductListing } from "@/components/storefront/home/ProductListing";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCurrentStore,
  fetchPublicCategories,
  fetchPublicProducts,
  fetchStoreFeedbacks,
  fetchStoreLayout,
} from "@/store/storefront/storefrontSlice";
import { LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";

export default function StoreFront() {
  const dispatch = useAppDispatch();
  const {
    store: { data: store, loading: storeLoading, notFound: storeNotFound },
    layout: { data: storeLayout },
    categories: { items: categories },
    feedbacks: { items: feedbacks },
  } = useAppSelector((state) => state.storefront);

  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [isSaasRoot, setIsSaasRoot] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");
      
      // Detect if it's the root domain (no subdomain)
      // Local: localhost:3000 -> length 1
      // Prod: vendemais.api.br -> length 3 (if we consider api.br as TLD) or 2
      // For simplicity, if parts.length <= 1 (localhost) or matches exactly the main domain
      const isLocalRoot = hostname === "localhost";
      const isProdRoot = hostname === "vendemais.api.br" || hostname.includes("vercel.app") && !hostname.includes("."); 
      
      // Better logic for subdomains:
      // foo.localhost -> length 2, foo
      // foo.vendemais.api.br -> length 4, foo
      let detectedSubdomain: string | null = null;
      
      if (hostname.endsWith("localhost")) {
        if (parts.length > 1) detectedSubdomain = parts[0];
      } else if (parts.length >= 3) {
        // subdomain.domain.com or subdomain.domain.com.br
        detectedSubdomain = parts[0];
      }

      if (!detectedSubdomain) {
        setIsSaasRoot(true);
      } else {
        setSubdomain(detectedSubdomain);
        dispatch(fetchCurrentStore());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (store) {
      dispatch(fetchStoreLayout());
      dispatch(fetchPublicCategories());
      dispatch(fetchPublicProducts({ featured: true }));
    }
  }, [dispatch, store]);

  useEffect(() => {
    if (storeLayout?.showFeedbacks) {
      dispatch(fetchStoreFeedbacks());
    }
  }, [dispatch, storeLayout?.showFeedbacks]);

  if (isSaasRoot) {
    return <LandingPage />;
  }

  if (storeLoading) return <LoadingOverlay visible />;

  if (storeNotFound) {
    return (
      <StoreNotFound
        subdomainInput={subdomain || ""}
        setSubdomainInput={() => {}}
        handleSimulate={() => {}}
      />
    );
  }

  return (
    <BaseScreen
      store={store}
      footer={
        <StoreFooter
          store={store}
          subdomainInput={subdomain || ""}
          setSubdomainInput={() => {}}
          handleSimulate={() => {}}
        />
      }
    >
      <MainContent>
        {/* Hero Section */}
        {storeLayout && (
          <HeroSection
            layout={storeLayout}
          />
        )}

        {/* Categories */}
        <CategorySection categories={categories} />

        {/* Product Listing */}
        <ProductListing primaryColor={store?.primaryColor} />

        {/* About Section */}
        {storeLayout && (
          <AboutSection layout={storeLayout} />
        )}

        {/* Feedback Section */}
        {storeLayout?.showFeedbacks && (
          <FeedbackSection feedbacks={feedbacks} />
        )}
      </MainContent>
    </BaseScreen>
  );
}
