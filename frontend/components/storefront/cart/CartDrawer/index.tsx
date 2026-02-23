"use client";

import {
  closeCart,
  removeFromCart,
  updateQuantity,
} from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ActionIcon,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import {
  CartFooter,
  CartItemWrapper,
  ItemHeader,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemPrice,
  QuantityControls,
  TotalRow,
} from "./styles";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items, isOpen } = useAppSelector((state) => state.cart);

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };
 
  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      const price = item.promotionalPrice || item.price;
      return acc + price * item.quantity;
    }, 0);
  }, [items]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const goToCheckout = () => {
    dispatch(closeCart());
    router.push("/checkout");
  };

  return (
    <>
      <Drawer
        opened={isOpen}
        onClose={handleClose}
        position="right"
        title={
          <Group>
            <FiShoppingBag size={20} />
            <Title order={4}>Seu Carrinho</Title>
          </Group>
        }
        padding="md"
        size="md"
      >
        {items.length === 0 ? (
          <Stack align="center" justify="center" h={300} gap="md">
            <FiShoppingBag size={48} color="var(--mantine-color-gray-4)" />
            <Text c="dimmed" ta="center">
              Seu carrinho está vazio.
              <br />
              Adicione produtos para começar.
            </Text>
            <Button variant="light" onClick={handleClose}>
              Continuar Comprando
            </Button>
          </Stack>
        ) : (
          <>
            <ScrollArea h="calc(100vh - 200px)" type="auto" offsetScrollbars>
              {items.map((item) => (
                <CartItemWrapper
                  key={`${item.id}-${item.selectedColor?.hex ?? "no-color"}`}
                >
                  <ItemImage>
                    {item.images?.[0] ? (
                      <img src={item.images[0]} alt={item.name} />
                    ) : (
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FiShoppingBag size={24} color="#adb5bd" />
                      </div>
                    )}
                  </ItemImage>
                  <ItemInfo>
                    <ItemHeader>
                      <ItemName>
                        {item.name}
                        {item.selectedColor && (
                          <span
                            style={{
                              display: "block",
                              fontSize: 12,
                              color: "#868e96",
                              marginTop: 2,
                            }}
                          >
                            Cor:{" "}
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <span
                                style={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: "50%",
                                  backgroundColor: item.selectedColor.hex,
                                  border: "1px solid rgba(0,0,0,0.15)",
                                }}
                              />
                              {item.selectedColor.name}
                            </span>
                          </span>
                        )}
                      </ItemName>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        size="sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        <FiTrash2 size={16} />
                      </ActionIcon>
                    </ItemHeader>
                    <Group justify="space-between" align="flex-end">
                      <QuantityControls>
                        <ActionIcon
                          size="sm"
                          variant="default"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus size={12} />
                        </ActionIcon>
                        <Text size="sm" fw={500} w={20} ta="center">
                          {item.quantity}
                        </Text>
                        <ActionIcon
                          size="sm"
                          variant="default"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={
                            !item.infiniteStock && item.quantity >= item.stock
                          }
                        >
                          <FiPlus size={12} />
                        </ActionIcon>
                      </QuantityControls>
                      <ItemPrice>
                        {formatPrice(
                          (item.promotionalPrice || item.price) *
                            item.quantity,
                        )}
                      </ItemPrice>
                    </Group>
                  </ItemInfo>
                </CartItemWrapper>
              ))}
            </ScrollArea>

            <CartFooter>
              <TotalRow>
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </TotalRow>
              <Button fullWidth size="lg" color="green" onClick={goToCheckout}>
                Finalizar Compra
              </Button>
            </CartFooter>
          </>
        )}
      </Drawer>
    </>
  );
}
