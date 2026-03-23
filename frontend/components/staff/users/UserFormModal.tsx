"use client";

import { useEffect } from "react";
import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Select,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { SaveStaffUserPayload } from "@/store/staffUsers/types";

interface UserFormModalProps {
  opened: boolean;
  loading: boolean;
  initialValues?: SaveStaffUserPayload | null;
  storeOptions: Array<{ value: string; label: string }>;
  roleOptions: Array<{ value: string; label: string }>;
  onClose(): void;
  onSubmit(values: SaveStaffUserPayload): void;
}

export function UserFormModal({
  opened,
  loading,
  initialValues,
  storeOptions,
  roleOptions,
  onClose,
  onSubmit,
}: UserFormModalProps) {
  const isEditing = Boolean(initialValues?.id);

  const form = useForm<SaveStaffUserPayload>({
    initialValues: {
      id: initialValues?.id,
      name: initialValues?.name ?? "",
      email: initialValues?.email ?? "",
      phone: initialValues?.phone ?? "",
      address: initialValues?.address ?? "",
      storeId: initialValues?.storeId ?? "",
      roleId: initialValues?.roleId ?? "",
      active: initialValues?.active ?? true,
      password: "",
    },
    validate: {
      name: (v) => (v.trim().length === 0 ? "Nome é obrigatório" : null),
      email: (v) => (v.trim().length === 0 ? "Email é obrigatório" : null),
      phone: (v) => (v.trim().length === 0 ? "Telefone é obrigatório" : null),
      storeId: (v) => (v.trim().length === 0 ? "Loja é obrigatória" : null),
      roleId: (v) => (v.trim().length === 0 ? "Cargo é obrigatório" : null),
      password: (v) => (!isEditing && v && v.trim().length < 6 ? "Senha deve ter pelo menos 6 caracteres" : null),
    },
  });

  useEffect(() => {
    if (opened) {
      if (initialValues) {
        form.setValues({
          id: initialValues.id,
          name: initialValues.name,
          email: initialValues.email,
          phone: initialValues.phone,
          address: initialValues.address,
          storeId: initialValues.storeId,
          roleId: initialValues.roleId,
          active: initialValues.active,
          password: "",
        });
      } else {
        form.reset();
      }
    }
  }, [opened, initialValues]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditing ? "Editar usuário" : "Novo usuário"}
      centered
      size="md"
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Nome"
            placeholder="Nome completo"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="email@exemplo.com"
            required
            {...form.getInputProps("email")}
          />
          <Group grow>
            <TextInput
              label="Telefone"
              placeholder="(00) 00000-0000"
              required
              {...form.getInputProps("phone")}
            />
            <Switch
              label="Ativo"
              mt="xl"
              {...form.getInputProps("active", { type: "checkbox" })}
            />
          </Group>

          <Select
            label="Loja"
            placeholder="Selecione a loja"
            data={storeOptions}
            required
            searchable
            {...form.getInputProps("storeId")}
          />

          <Select
            label="Cargo"
            placeholder="Selecione o cargo"
            data={roleOptions}
            required
            {...form.getInputProps("roleId")}
          />

          <TextInput
            label="Endereço"
            placeholder="Rua, Número, Bairro, Cidade"
            {...form.getInputProps("address")}
          />

          <PasswordInput
            label={isEditing ? "Nova senha (deixe em branco para manter)" : "Senha"}
            placeholder="Sua senha"
            required={!isEditing}
            {...form.getInputProps("password")}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="subtle" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" loading={loading}>
              Salvar
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
