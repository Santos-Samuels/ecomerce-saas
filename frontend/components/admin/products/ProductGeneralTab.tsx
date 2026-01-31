import { Stack, TextInput, Textarea, Tabs } from "@mantine/core";
import type { ChangeEvent } from "react";
import type { UseFormReturnType } from "@mantine/form";
import type { ProductFormValues } from "./ProductFormModal";

interface ProductGeneralTabProps {
  form: UseFormReturnType<ProductFormValues>;
  isEditing: boolean;
}

export function ProductGeneralTab({ form, isEditing }: ProductGeneralTabProps) {
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.value;
    form.setFieldValue("name", name);
    if (!isEditing) {
      const slug = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setFieldValue("slug", slug);
    }
  };

  return (
    <Tabs.Panel value="general">
      <Stack gap="md">
        <TextInput
          label="Nome do produto"
          placeholder="Ex: Camiseta Básica"
          required
          {...form.getInputProps("name")}
          onChange={handleNameChange}
        />

        <TextInput
          label="Slug"
          placeholder="camiseta-basica"
          required
          {...form.getInputProps("slug")}
        />

        <Textarea
          label="Descrição"
          placeholder="Detalhes do produto..."
          minRows={3}
          {...form.getInputProps("description")}
        />
      </Stack>
    </Tabs.Panel>
  );
}
