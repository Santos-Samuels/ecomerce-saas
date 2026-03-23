"use client";

import { StoreFooter } from "@/components/storefront/common/StoreFooter";
import { BaseScreen } from "@/components/storefront/common/layout/BaseScreen";
import { clearCart } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentStore } from "@/store/storefront/storefrontSlice";
import { sendWhatsAppMessage } from "@/store/whatsapp/whatsappSlice";
import {
  Button,
  LoadingOverlay,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FiShoppingBag } from "react-icons/fi";
import * as S from "./styles";

interface CheckoutFormValues {
  customerName: string;
  customerPhone: string;
  paymentMethod: string;
  pickupDate: string;
  observations: string;
}

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    store: { data: store, loading: storeLoading, notFound: storeNotFound },
  } = useAppSelector((state) => state.storefront);
  const { items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!store) {
      dispatch(fetchCurrentStore());
    }
  }, [dispatch, store]);

  const form = useForm<CheckoutFormValues>({
    initialValues: {
      customerName: "",
      customerPhone: "",
      paymentMethod: "",
      pickupDate: "",
      observations: "",
    },
    validate: {
      customerName: (v) => (v.trim().length < 2 ? "Informe o nome completo" : null),
      customerPhone: (v) =>
        v.replace(/\D/g, "").length < 10 ? "Informe um WhatsApp válido" : null,
      paymentMethod: (v) => (!v ? "Selecione a forma de pagamento" : null),
      pickupDate: (v) => (!v ? "Informe a data de retirada" : null),
    },
  });

  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      const price = item.promotionalPrice || item.price;
      return acc + price * item.quantity;
    }, 0);
  }, [items]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const handleSubmit = (values: CheckoutFormValues) => {
    if (!store?.phone) {
      notifications.show({
        title: "WhatsApp não configurado",
        message: "A loja ainda não configurou o número de WhatsApp para pedidos.",
        color: "red",
      });
      return;
    }

    const phoneDigits = store.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      notifications.show({
        title: "WhatsApp inválido",
        message: "Não foi possível identificar um número de WhatsApp válido da loja.",
        color: "red",
      });
      return;
    }

    // Preparar os dados para o WhatsApp Business API
    // Aqui assumimos que você tem um template configurado chamado 'novo_pedido_vende_mais'
    const itemsDescription = items
      .map((item) => `${item.quantity}x ${item.name}${item.selectedColor ? ` (Cor: ${item.selectedColor.name})` : ""}`)
      .join(", ");

    dispatch(
      sendWhatsAppMessage({
        to: phoneDigits,
        templateName: "novo_pedido_vende_mais",
        languageCode: "pt_BR",
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: values.customerName }, // {{1}} - Nome do Cliente
              { type: "text", text: itemsDescription }, // {{2}} - Itens do Pedido
              { type: "text", text: formatPrice(total) }, // {{3}} - Total
              { type: "text", text: values.paymentMethod }, // {{4}} - Forma de Pagamento
            ],
          },
        ],
      })
    );

    // Fallback: Manter o redirecionamento manual para o WhatsApp pessoal se a API falhar ou para lojas sem API
    const now = new Date();
    const dateStr = now.toLocaleDateString("pt-BR");
    const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    const itemsLines = items.map((item, index) => {
      const unitPrice = item.promotionalPrice || item.price;
      const lineTotal = unitPrice * item.quantity;
      const colorPart = item.selectedColor ? ` | Cor: _${item.selectedColor.name}_` : "";
      return `- ${index + 1}) *${item.name}*${colorPart}\n  -> Qtd: *${item.quantity}* | Un: *${formatPrice(
        unitPrice,
      )}* | Subtotal: *${formatPrice(lineTotal)}*`;
    });

    const divider = "----------------------------";
    const lines = [
      "*Pedido para Retirada na Loja*",
      divider,
      `*Data do pedido:* ${dateStr} às ${timeStr}`,
      "",
      "*Itens:*",
      ...itemsLines,
      "",
      `*Total:* ${formatPrice(total)}`,
      divider,
      "*Cliente*",
      `- Nome: ${values.customerName}`,
      `- WhatsApp: ${values.customerPhone}`,
      "",
      "*Entrega*",
      "- Forma: *Retirada na loja*",
    ];

    if (values.pickupDate) {
      const pickupDateFormatted = values.pickupDate.split("-").reverse().join("/");
      lines.push(`- Data de retirada: *${pickupDateFormatted}*`);
    }

    if (store.address) {
      lines.push(`- Endereço da loja: ${store.address}`);
    }

    lines.push("");
    lines.push("*Pagamento*");
    lines.push(`- Forma: *${values.paymentMethod}*`);

    if (values.observations) {
      lines.push("", "*Observações*", values.observations);
    }

    const message = lines.join("\n");
    const url = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
    
    // Abre o WhatsApp e limpa o carrinho
    window.open(url, "_blank");
    dispatch(clearCart());
    router.push("/checkout/success");
  };

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
        <S.Header>
          <S.HeaderTitle>
            <Title order={3}>Finalizar compra</Title>
            <S.HeaderSubtitle>
              Revise seus dados e confirme o pedido para finalizar pelo WhatsApp.
            </S.HeaderSubtitle>
          </S.HeaderTitle>
          {store && (
            <Text size="sm" c="dimmed">
              Loja: <strong>{store.name}</strong>
            </Text>
          )}
        </S.Header>

        {items.length === 0 ? (
          <Paper p="xl" withBorder>
            <Stack align="center" gap="md">
              <FiShoppingBag size={48} color="var(--mantine-color-gray-4)" />
              <Text c="dimmed" ta="center">
                Seu carrinho está vazio. Adicione produtos para continuar.
              </Text>
            </Stack>
          </Paper>
        ) : (
          <S.CheckoutGrid as="form" onSubmit={form.onSubmit(handleSubmit)}>
            <S.LeftColumn>
              <S.Section>
                <S.SectionTitle>1. Contato</S.SectionTitle>
                <Stack gap="md">
                  <TextInput
                    label="Nome completo"
                    placeholder="Seu nome"
                    {...form.getInputProps("customerName")}
                    required
                  />
                  <TextInput
                    label="WhatsApp"
                    placeholder="(00) 00000-0000"
                    {...form.getInputProps("customerPhone")}
                    required
                  />
                </Stack>
              </S.Section>

              <S.Section>
                <S.SectionTitle>2. Forma de entrega</S.SectionTitle>
                <Stack gap="sm">
                  <Text fw={600}>Retirada na loja</Text>
                  {store?.address && (
                    <Text c="dimmed" size="sm">
                      Endereço da loja: {store.address}
                    </Text>
                  )}
                  <TextInput
                    type="date"
                    label="Data de retirada"
                    {...form.getInputProps("pickupDate")}
                    required
                  />
                </Stack>
              </S.Section>

              <S.Section>
                <S.SectionTitle>3. Pagamento</S.SectionTitle>
                <Select
                  label="Forma de pagamento"
                  placeholder="Selecione"
                  data={[
                    { value: "Pix", label: "Pix" },
                    { value: "Cartão de crédito", label: "Cartão de crédito" },
                    { value: "Cartão de débito", label: "Cartão de débito" },
                    { value: "Dinheiro", label: "Dinheiro" },
                    { value: "Transferência", label: "Transferência" },
                  ]}
                  {...form.getInputProps("paymentMethod")}
                  required
                />
                <Textarea
                  label="Observações"
                  placeholder="Alguma instrução adicional para o pedido"
                  minRows={2}
                  {...form.getInputProps("observations")}
                />
              </S.Section>
            </S.LeftColumn>

            <S.RightColumn>
              <S.Section>
                <S.SectionTitle>Resumo do pedido</S.SectionTitle>
                <S.ItemList>
                  {items.map((item) => {
                    const unit = item.promotionalPrice || item.price;
                    const lineTotal = unit * item.quantity;
                    return (
                      <S.ItemRow key={`${item.id}-${item.selectedColor?.hex ?? "no-color"}`}>
                        <S.ItemLeft>
                          <S.ItemTitle>{item.name}</S.ItemTitle>
                          <S.ItemMeta>
                            <span>
                              Qtd: <strong>{item.quantity}</strong> • Un:{" "}
                              <strong>{formatPrice(unit)}</strong>
                            </span>
                            {item.selectedColor && (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                                <S.ColorDot $hex={item.selectedColor.hex} />
                                <span>Cor: {item.selectedColor.name}</span>
                              </span>
                           )}
                          </S.ItemMeta>
                        </S.ItemLeft>
                        <S.ItemRight>
                          <S.ItemSub>
                            {item.quantity} × {formatPrice(unit)}
                          </S.ItemSub>
                          <S.ItemTotal>{formatPrice(lineTotal)}</S.ItemTotal>
                        </S.ItemRight>
                      </S.ItemRow>
                    );
                  })}
                </S.ItemList>

                <S.SummaryFooter>
                  <Text
                    size="sm"
                    c="dimmed"
                  >
                    Ao clicar em Enviar pedido pelo WhatsApp, os dados serão enviados para a loja e
                    o atendimento continuará pelo WhatsApp.
                  </Text>
                  <S.TotalRow>
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </S.TotalRow>
                  <Button
                    fullWidth
                    type="submit"
                    color="green"
                    size="md"
                  >
                    Enviar pedido pelo WhatsApp
                  </Button>
                </S.SummaryFooter>
              </S.Section>
            </S.RightColumn>
          </S.CheckoutGrid>
        )}
      </S.PageWrapper>
    </BaseScreen>
  );
}
