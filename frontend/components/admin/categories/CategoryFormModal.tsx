import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IProductCategory } from "@ecomerce/shared";
import { useState } from "react";

interface FormState {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
}

interface CategoryFormModalProps {
  opened: boolean;
  saving: boolean;
  category?: IProductCategory;
  onClose(): void;
  onSubmit(values: FormState): void;
}

export function CategoryFormModal({
  opened,
  saving,
  category,
  onClose,
  onSubmit,
}: CategoryFormModalProps) {
  const [form, setForm] = useState<FormState>(() => ({
    id: category?.id,
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    description: category?.description ?? "",
    active: category?.active ?? true,
  }));

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: prev.id ? prev.slug : createSlug(value),
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  const isEditing = Boolean(form.id);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditing ? "Editar categoria" : "Nova categoria"}
      centered
    >
      <Stack gap="md">
        <TextInput
          label="Nome"
          placeholder="Nome da categoria"
          value={form.name}
          onChange={(event) => handleNameChange(event.currentTarget.value)}
          required
        />

        <TextInput
          label="Slug"
          placeholder="slug-da-categoria"
          description="Usado na URL e identificação interna."
          value={form.slug}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, slug: event.currentTarget.value }))
          }
          required
        />

        <Textarea
          label="Descrição"
          placeholder="Descrição opcional da categoria"
          minRows={3}
          value={form.description}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              description: event.currentTarget.value,
            }))
          }
        />

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancelar
          </Button>
          <Button loading={saving} onClick={handleSubmit}>
            {isEditing ? "Salvar alterações" : "Criar categoria"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

function createSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
