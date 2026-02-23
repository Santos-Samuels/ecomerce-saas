"use client";

import { ProductListing } from "@/components/storefront/home/ProductListing";
import { StoreFooter } from "@/components/storefront/common/StoreFooter";
import { BaseScreen } from "@/components/storefront/common/layout/BaseScreen";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentStore } from "@/store/storefront/storefrontSlice";
import { Button, LoadingOverlay, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useEffect } from "react";
import * as S from "./styles";

export default function CheckoutSuccessPage() {
  const dispatch = useAppDispatch();
  const {
    store: { data: store, loading: storeLoading },
  } = useAppSelector((state) => state.storefront);

  useEffect(() => {
    if (!store) {
      dispatch(fetchCurrentStore());
    }
  }, [dispatch, store]);

  if (storeLoading) {
    return <LoadingOverlay visible />;
  }

  return (
    <BaseScreen
      store={store}
      footer={
        <StoreFooter
          store={store}
          subdomainInput=""
          setSubdomainInput={() => {}}
          handleSimulate={() => {}}
        />
      }
    >
      <S.PageWrapper>
        <S.Hero>
          <S.HeroText>
            <S.HeroTitle>Pedido enviado com sucesso!</S.HeroTitle>
            <S.HeroSubtitle>
              Recebemos suas informações. Em breve a loja dará sequência pelo WhatsApp.
            </S.HeroSubtitle>
          </S.HeroText>
          <S.Actions>
            <Button component={Link} href="/products" variant="default">
              Ver mais produtos
            </Button>
            <Button component={Link} href="/" color="green">
              Voltar para a Home
            </Button>
          </S.Actions>
        </S.Hero>

        <Stack gap="md">
          <Text fw={700}>Destaques</Text>
          <ProductListing primaryColor={store?.primaryColor} />
        </Stack>
      </S.PageWrapper>
    </BaseScreen>
  );
}

