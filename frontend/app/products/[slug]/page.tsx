"use client";

import { StoreFooter } from "@/components/storefront/common/StoreFooter";
import { BaseScreen } from "@/components/storefront/common/layout/BaseScreen";
import { ProductDetails } from "@/components/storefront/product/ProductDetails";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentStore } from "@/store/storefront/storefrontSlice";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  const dispatch = useAppDispatch();
  const { data: store } = useAppSelector((state) => state.storefront.store);
  const [subdomainInput, setSubdomainInput] = useState("");

  useEffect(() => {
    if (!store) {
      dispatch(fetchCurrentStore());
    }
    
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (
        hostname.includes(".localhost") ||
        (hostname !== "localhost" && !hostname.includes("verel.app"))
      ) {
        const subdomain = hostname.split(".")[0];
        if (subdomainInput !== subdomain) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setSubdomainInput(subdomain);
        }
      }
    }
  }, [dispatch, store, subdomainInput]);

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

  const primaryColor = store?.primaryColor;
  const whatsappNumber = store?.phone;

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
      <ProductDetails
        slug={params.slug}
        primaryColor={primaryColor}
        whatsappNumber={whatsappNumber}
      />
    </BaseScreen>
  );
}
