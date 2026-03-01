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
      const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN;

      if (!baseDomain) {
        throw new Error(
          "A variável de ambiente NEXT_PUBLIC_BASE_DOMAIN é obrigatória para o funcionamento do sistema.",
        );
      }

      // Se o hostname termina com .BASE_DOMAIN, extraímos o que vem antes
      let detectedSubdomain: string | null = null;

      if (hostname.endsWith(`.${baseDomain}`)) {
        detectedSubdomain = hostname.replace(`.${baseDomain}`, "");
      }

      if (!detectedSubdomain || hostname === baseDomain) {
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
