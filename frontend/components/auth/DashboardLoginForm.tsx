"use client";

import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Group,
  Anchor,
  Text,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/auth/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RoleById } from "@ecomerce/shared";

export function DashboardLoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, token, user } = useAppSelector((state) => state.auth);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      password: (value) => (value.length < 1 ? "Senha é obrigatória" : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (token && user?.role?.name === RoleById.Admin) {
      router.replace("/admin");
    }
  }, [token, user, router]);

  return (
    <Container w={420} my={40}>
      <Title
        ta="center"
        style={{ fontFamily: "var(--mantine-font-family)" }}
        fw={900}
      >
        Portal Admin
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Faça login para gerenciar sua loja
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="seu@email.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Senha"
            placeholder="Sua senha"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group justify="space-between" mt="lg">
            <Anchor component="button" size="sm">
              Esqueceu a senha?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
