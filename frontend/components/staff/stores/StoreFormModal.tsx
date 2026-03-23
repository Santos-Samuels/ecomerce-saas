"use client";

import { StorePermission } from "@ecomerce/shared";
import {
    Button,
    Group,
    Modal,
    MultiSelect,
    Stack,
    TextInput,
    Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export interface StoreFormValues {
  id?: string;
  name: string;
  description?: string;
  address?: string;
  phone: string;
  secondaryPhone?: string;
  email: string;
  logoUrl?: string;
  primaryColor?: string;
  instagramHandle?: string;
  subdomain?: string; // required only for create
  permissions?: StorePermission[];
}

interface StoreFormModalProps {
  opened: boolean;
  loading: boolean;
  initialValues?: StoreFormValues | null;
  permissionOptions: Array<{ value: string; label: string }>;
  onClose(): void;
  onSubmit(values: StoreFormValues): void;
}

export function StoreFormModal({
  opened,
  loading,
  initialValues,
  permissionOptions,
  onClose,
  onSubmit,
}: StoreFormModalProps) {
  const isEditing = Boolean(initialValues?.id);

  const form = useForm<StoreFormValues>({
    initialValues: {
      id: initialValues?.id,
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      address: initialValues?.address ?? "",
      phone: initialValues?.phone ?? "",
      secondaryPhone: initialValues?.secondaryPhone ?? "",
      email: initialValues?.email ?? "",
      logoUrl: initialValues?.logoUrl ?? "",
      primaryColor: initialValues?.primaryColor ?? "",
      instagramHandle: initialValues?.instagramHandle ?? "",
      subdomain: initialValues?.subdomain ?? "",
      permissions: initialValues?.permissions ?? [],
    },
    validate: {
      name: (v) => (v.trim().length === 0 ? "Nome é obrigatório" : null),
      phone: (v) => (v.trim().length === 0 ? "Telefone é obrigatório" : null),
      email: (v) => (v.trim().length === 0 ? "Email é obrigatório" : null),
      subdomain: (v) =>
        isEditing || v !== undefined
          ? v?.trim().length === 0 && !isEditing
            ? "Subdomínio é obrigatório"
            : null
          : null,
    },
  });

  const handleSubmit = (values: StoreFormValues) => {
    onSubmit({
      ...values,
      subdomain: isEditing ? undefined : values.subdomain?.trim(),
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditing ? "Editar loja" : "Nova loja"}
      centered
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Group grow>
            <TextInput
              label="Nome"
              placeholder="Nome da loja"
              required
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Subdomínio"
              placeholder="minha-loja"
              description={
                isEditing
                  ? "Subdomínio não pode ser alterado."
                  : "Usado para acessar a loja via subdomínio."
              }
              required={!isEditing}
              disabled={isEditing}
              {...form.getInputProps("subdomain")}
            />
          </Group>

          <Group grow>
            <TextInput
              label="Telefone Principal"
              placeholder="(99) 99999-9999"
              required
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="Telefone Secundário (Opcional)"
              placeholder="(99) 99999-9999"
              {...form.getInputProps("secondaryPhone")}
            />
          </Group>

          <TextInput
            label="Email"
            placeholder="contato@loja.com"
            required
            {...form.getInputProps("email")}
          />

          <TextInput
            label="Endereço"
            placeholder="Rua Exemplo, 123 - Bairro"
            {...form.getInputProps("address")}
          />

          <TextInput
            label="Logo (URL)"
            placeholder="https://cdn.seusite.com/logo.png"
            {...form.getInputProps("logoUrl")}
          />

          <Group grow>
            <TextInput
              label="Cor primária"
              placeholder="#1E3A8A"
              {...form.getInputProps("primaryColor")}
            />
            <TextInput
              label="Instagram"
              placeholder="@minhaloja"
              {...form.getInputProps("instagramHandle")}
            />
          </Group>

          <Textarea
            label="Descrição"
            placeholder="Breve descrição da loja"
            minRows={3}
            {...form.getInputProps("description")}
          />

          <MultiSelect
            label="Permissões"
            placeholder="Selecione as permissões"
            data={permissionOptions}
            value={(form.values.permissions ?? []).map((p) => p)}
            onChange={(vals) =>
              form.setFieldValue(
                "permissions",
                vals as unknown as StorePermission[],
              )
            }
            searchable
            nothingFoundMessage="Nenhuma permissão"
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" loading={loading}>
              {isEditing ? "Salvar alterações" : "Criar loja"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
