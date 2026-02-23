"use client";

import { StoreFooter } from "@/components/storefront/common/StoreFooter";
import { StoreNotFound } from "@/components/storefront/common/StoreNotFound";
import { BaseScreen } from "@/components/storefront/common/layout/BaseScreen";
import { ContactForm } from "@/components/storefront/contact/ContactForm";
import { ContactInfo } from "@/components/storefront/contact/ContactInfo";
import {
  ContactContainer,
  ContactGrid,
  ContactWrapper,
  PageSubtitle,
  PageTitle,
} from "@/components/storefront/contact/styles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentStore } from "@/store/storefront/storefrontSlice";
import { LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const {
    store: { data: store, loading: storeLoading, notFound: storeNotFound },
  } = useAppSelector((state) => state.storefront);

  const [subdomainInput, setSubdomainInput] = useState(() => {
    if (typeof window === "undefined") return "";
    const hostname = window.location.hostname;
    if (
      hostname.includes(".localhost") ||
      (hostname !== "localhost" && !hostname.includes("verel.app"))
    ) {
      return hostname.split(".")[0];
    }
    return "";
  });

  useEffect(() => {
    dispatch(fetchCurrentStore());
  }, [dispatch]);

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
        <StoreFooter
          store={store}
          subdomainInput={subdomainInput}
          setSubdomainInput={setSubdomainInput}
          handleSimulate={handleSimulate}
        />
      }
    >
      <ContactWrapper>
        <ContactContainer>
          <PageTitle>Fale Conosco</PageTitle>
          <PageSubtitle>
            Tem alguma dúvida, sugestão ou precisa de ajuda? Entre em contato
            conosco através do formulário abaixo ou pelos nossos canais de
            atendimento.
          </PageSubtitle>

          <ContactGrid>
            {store && <ContactInfo store={store} />}
            <ContactForm primaryColor={store?.primaryColor} />
          </ContactGrid>
        </ContactContainer>
      </ContactWrapper>
    </BaseScreen>
  );
}
