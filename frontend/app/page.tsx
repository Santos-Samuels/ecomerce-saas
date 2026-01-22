"use client";

import { AboutSection } from "@/components/storefront/AboutSection";
import { FeedbackSection } from "@/components/storefront/FeedbackSection";
import { HeroSection } from "@/components/storefront/HeroSection";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { StoreFooter } from "@/components/storefront/StoreFooter";
import { StoreNotFound } from "@/components/storefront/StoreNotFound";
import { BaseScreen } from "@/components/storefront/layout/BaseScreen";
import { MainContent } from "@/components/storefront/layout/styles";
import { publicApi } from "@/lib/api";
import { IProduct, IStore, IStoreFeedback, IStoreLayout } from "@ecomerce/shared";
import { LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";

export default function StoreFront() {
  const [store, setStore] = useState<IStore | null>(null);
  const [storeLayout, setStoreLayout] = useState<IStoreLayout | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [feedbacks, setFeedbacks] = useState<IStoreFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subdomainInput, setSubdomainInput] = useState("");

  useEffect(() => {
    // Set initial subdomain input from current URL
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (
        hostname.includes(".localhost") ||
        (hostname !== "localhost" && !hostname.includes("verel.app"))
      ) {
        setSubdomainInput(hostname.split(".")[0]);
      }
    }
    loadStoreData();
  }, []);

  const loadStoreData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch Store Info
      // The api client is configured to use the current hostname:3003
      // so the backend receives the correct Host header
      const storeRes = await publicApi.get<IStore>("/stores/current");
      setStore(storeRes.data);

      // Fetch Store Layout
      try {
        const layoutRes = await publicApi.get<IStoreLayout>("/store-layout");
        setStoreLayout(layoutRes.data);
      } catch (err) {
        console.warn("Store layout not found or error loading layout", err);
      }

      // Fetch Products
      const productsRes = await publicApi.get<IProduct[]>("/products");
      setProducts(productsRes.data);

      // Fetch Feedbacks
      try {
        const feedbacksRes = await publicApi.get<IStoreFeedback[]>("/store/feedbacks");
        setFeedbacks(feedbacksRes.data);
      } catch (err) {
        console.warn("Feedbacks fetch failed", err);
      }

    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 404) {
        setError("Loja não encontrada para este subdomínio.");
      } else {
        setError("Não foi possível carregar a loja. Verifique a conexão.");
      }
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) return <LoadingOverlay visible />;

  if (error) {
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
      {storeLayout && (
        <HeroSection layout={storeLayout} primaryColor={store?.primaryColor} />
      )}
      {storeLayout && <AboutSection layout={storeLayout} />}
      <MainContent>
        <div id="products">
          <ProductGrid 
            products={products.filter(p => p.featured)} 
            primaryColor={store?.primaryColor} 
            title="Produtos em Destaque"
          />
        </div>
        
        {storeLayout?.showFeedbacks && (
          <FeedbackSection feedbacks={feedbacks} />
        )}
      </MainContent>
    </BaseScreen>
  );
}
