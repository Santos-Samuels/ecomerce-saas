"use client";

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
    feedbacks: { items: feedbacks },
    categories: { items: categories },
  } = useAppSelector((state) => state.storefront);

  const [subdomainInput, setSubdomainInput] = useState("");

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
    dispatch(fetchStoreLayout());
    dispatch(fetchPublicCategories());
  }, [dispatch]);

  useEffect(() => {
    if (storeLayout?.showFeedbacks) {
      dispatch(fetchStoreFeedbacks());
    }
  }, [dispatch, storeLayout?.showFeedbacks]);

  const handleSimulate = () => {
    if (!subdomainInput) return;
    const protocol = window.location.protocol;
    // Assume localhost environment for testing
    // If input is "localhost", go to root
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
        <StoreFooter
          store={store}
          subdomainInput={subdomainInput}
          setSubdomainInput={setSubdomainInput}
          handleSimulate={handleSimulate}
        />
      }
    >
      <MainContent>
        {/* Hero Section */}
        {storeLayout && (
          <HeroSection
            layout={storeLayout}
            primaryColor={store?.primaryColor}
          />
        )}

        {/* About Section */}
        {storeLayout && (
          <AboutSection
            layout={storeLayout}
          />
        )}

        {/* Categories Section */}
        <CategorySection categories={categories} />

        {/* Products Section */}
        <ProductListing primaryColor={store?.primaryColor} />

        {/* Feedback Section */}
        {storeLayout?.showFeedbacks && (
          <FeedbackSection
            feedbacks={feedbacks}
          />
        )}
      </MainContent>
    </BaseScreen>
  );
}
