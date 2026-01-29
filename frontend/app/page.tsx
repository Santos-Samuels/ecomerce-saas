"use client";

import { AboutSection } from "@/components/storefront/AboutSection";
import { FeedbackSection } from "@/components/storefront/FeedbackSection";
import { HeroSection } from "@/components/storefront/HeroSection";
import { ProductListing } from "@/components/storefront/ProductListing";
import { StoreFooter } from "@/components/storefront/StoreFooter";
import { StoreNotFound } from "@/components/storefront/StoreNotFound";
import { BaseScreen } from "@/components/storefront/layout/BaseScreen";
import { MainContent } from "@/components/storefront/layout/styles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    fetchCurrentStore,
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
    dispatch(fetchStoreFeedbacks());
  }, [dispatch]);

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
