"use client";

import { useEffect, useState } from "react";
import { publicApi } from "@/lib/api";
import { LoadingOverlay } from "@mantine/core";
import { IStore, IProduct } from "@ecomerce/shared";
import { StoreNotFound } from "@/components/storefront/StoreNotFound";
import { StoreHeader } from "@/components/storefront/StoreHeader";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { StoreFooter } from "@/components/storefront/StoreFooter";

export default function StoreFront() {
  const [store, setStore] = useState<IStore | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
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

      // Fetch Products
      const productsRes = await publicApi.get<IProduct[]>("/products");
      setProducts(productsRes.data);
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
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StoreHeader store={store} />
      <ProductGrid products={products} primaryColor={store?.primaryColor} />
      <StoreFooter
        storeName={store?.name}
        subdomainInput={subdomainInput}
        setSubdomainInput={setSubdomainInput}
        handleSimulate={handleSimulate}
      />
    </div>
  );
}
