"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StaffSidebar } from "@/components/staff/layout/StaffSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import * as L from "../../styles";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearStaffStoreDetails,
  fetchStaffStoreDetails,
} from "@/store/staffStores/staffStoresSlice";
import { fetchStaffUsers } from "@/store/staffUsers/staffUsersSlice";
import {
  Badge,
  Card,
  Group,
  Stack,
  Text,
  Button,
  SimpleGrid,
  NumberFormatter,
  ThemeIcon,
  Divider,
  Image,
  TextInput,
} from "@mantine/core";
import {
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiTrendingUp,
  FiSearch,
} from "react-icons/fi";
import { UsersTable, StaffUserRow } from "@/components/staff/users/UsersTable";

export default function StaffStoreDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { current, currentLoading } = useAppSelector(
    (s) => s.staffStores,
  );
  const { items: allUsers, loading: usersLoading } = useAppSelector(
    (s) => s.staffUsers,
  );

  const [userSearch, setUserSearch] = useState("");

  const metrics = [
    { id: "products", label: "Produtos", value: 128, icon: FiPackage },
    { id: "orders", label: "Pedidos", value: 42, icon: FiShoppingBag },
    { id: "customers", label: "Clientes", value: 315, icon: FiUsers },
    { id: "revenue", label: "Faturamento", value: 18452.7, icon: FiTrendingUp },
  ];

  useEffect(() => {
    if (!id) return;
    dispatch(fetchStaffStoreDetails({ id }));
    dispatch(fetchStaffUsers());
    return () => {
      dispatch(clearStaffStoreDetails());
    };
  }, [dispatch, id]);

  const storeUsers = allUsers.filter((u) => u.storeId === id);
  const filteredUsers = storeUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()),
  );

  const title = current ? current.name : "Detalhes da loja";
  const subtitle = current ? `ID: ${current.id}` : "Carregando detalhes...";

  return (
    <L.StaffLayout>
      <StaffSidebar />
      <L.MainContent>
        <AdminPageHeader
          title={title}
          subtitle={subtitle}
          action={<Badge color={current?.active ? "green" : "gray"}>{current?.active ? "Ativa" : "Inativa"}</Badge>}
        />

        <S.Container>
          <Stack gap="md">
            <Card withBorder radius="md" padding="lg">
              {currentLoading && (
                <Text size="sm" c="dimmed">
                  Carregando...
                </Text>
              )}

              {!currentLoading && !current && (
                <Stack gap="xs">
                  <Text size="sm" c="dimmed">
                    Loja não encontrada.
                  </Text>
                  <Button
                    variant="subtle"
                    onClick={() => router.push("/staff/stores")}
                    size="xs"
                    mt="xs"
                  >
                    Voltar para a lista
                  </Button>
                </Stack>
              )}

              {!currentLoading && current && (
                <Stack gap="md">
                  <Group justify="space-between">
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed">
                        Loja
                      </Text>
                      <Text fw={600}>{current.name}</Text>
                    </Stack>
                    <Group gap="xs">
                      <Badge color={current.active ? "green" : "gray"}>
                        {current.active ? "Ativa" : "Inativa"}
                      </Badge>
                    </Group>
                  </Group>

                  <Divider />

                  <S.StatGrid>
                    {metrics.map((m) => {
                      const Icon = m.icon;
                      return (
                        <Card key={m.id} withBorder padding="md" radius="md">
                          <Group justify="space-between">
                            <Group gap="sm">
                              <ThemeIcon variant="light" radius="md" size="lg">
                                <Icon size={16} />
                              </ThemeIcon>
                              <Stack gap={0}>
                                <Text size="xs" c="dimmed">
                                  {m.label}
                                </Text>
                                {m.id === "revenue" ? (
                                  <Text fw={700}>
                                    <NumberFormatter
                                      prefix="R$ "
                                      value={m.value}
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      decimalScale={2}
                                    />
                                  </Text>
                                ) : (
                                  <Text fw={700}>{m.value}</Text>
                                )}
                              </Stack>
                            </Group>
                          </Group>
                        </Card>
                      );
                    })}
                  </S.StatGrid>
                </Stack>
              )}
            </Card>

            {!currentLoading && current && (
              <Card withBorder radius="md" padding="lg">
                <Stack gap="sm">
                  <Text fw={600}>Informações gerais</Text>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed">
                        E-mail
                      </Text>
                      <Text>{current.email}</Text>
                    </Stack>
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed">
                        Telefone
                      </Text>
                      <Text>{current.phone}{current.secondaryPhone ? ` / ${current.secondaryPhone}` : ""}</Text>
                    </Stack>
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed">
                        Cor primária
                      </Text>
                      <Text>{current.primaryColor ?? "—"}</Text>
                    </Stack>
                  </SimpleGrid>
                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed">
                        Endereço
                      </Text>
                      <Text>{current.address ?? "—"}</Text>
                    </Stack>
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed">
                        Instagram
                      </Text>
                      <Text>{current.instagramHandle ?? "—"}</Text>
                    </Stack>
                  </SimpleGrid>
                </Stack>
              </Card>
            )}

            {!currentLoading && current && (
              <Card withBorder radius="md" padding="lg">
                <Stack gap="md">
                  <Group justify="space-between">
                    <Text fw={600}>Usuários vinculados</Text>
                    <Badge variant="light">{storeUsers.length}</Badge>
                  </Group>

                  <TextInput
                    placeholder="Buscar usuários por nome ou email..."
                    leftSection={<FiSearch size={14} />}
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.currentTarget.value)}
                    size="xs"
                  />

                  <UsersTable
                    data={filteredUsers as StaffUserRow[]}
                    loading={usersLoading}
                    onEdit={(user) => router.push("/staff/users")}
                    onDelete={() => {}}
                  />
                </Stack>
              </Card>
            )}
          </Stack>

          <Stack gap="md">
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Text fw={600}>Permissões</Text>
                <Group gap={6}>
                  {currentLoading && (
                    <Text size="sm" c="dimmed">
                      Carregando...
                    </Text>
                  )}
                  {!currentLoading &&
                    current &&
                    (current.permissions ?? []).length === 0 && (
                      <Text size="sm" c="dimmed">
                        Nenhuma permissão associada
                      </Text>
                    )}
                  {!currentLoading &&
                    current &&
                    (current.permissions ?? []).map((code) => (
                      <Badge key={code} variant="light">
                        {code}
                      </Badge>
                    ))}
                </Group>
              </Stack>
            </Card>

            {!currentLoading && current && (
              <Card withBorder radius="md" padding="lg">
                <Stack gap="sm">
                  <Text fw={600}>Identidade visual</Text>
                  {current.logoUrl ? (
                    <Image
                      src={current.logoUrl}
                      alt={`Logo da ${current.name}`}
                      radius="md"
                      mah={120}
                      fit="contain"
                    />
                  ) : (
                    <Text size="sm" c="dimmed">
                      Nenhuma logo cadastrada
                    </Text>
                  )}
                  <SimpleGrid cols={{ base: 1 }}>
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed">
                        Subdomínio
                      </Text>
                      <Text>{current.subdomain ?? "—"}</Text>
                    </Stack>
                  </SimpleGrid>
                </Stack>
              </Card>
            )}

            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Text fw={600}>Atividades recentes</Text>
                <Stack gap={6}>
                  <Text size="sm" c="dimmed">
                    Nenhuma atividade registrada
                  </Text>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </S.Container>
      </L.MainContent>
    </L.StaffLayout>
  );
}
