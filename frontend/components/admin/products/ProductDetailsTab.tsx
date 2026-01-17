import { Group, Select, Stack, Switch, Tabs } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { IProductCategory, IProductMaterial } from "@ecomerce/shared";
import type { ProductFormValues } from "./ProductFormModal";

interface ProductDetailsTabProps {
  form: UseFormReturnType<ProductFormValues>;
  categories: IProductCategory[];
  materials: IProductMaterial[];
  isEditing: boolean;
}

export function ProductDetailsTab({
  form,
  categories,
  materials,
  isEditing,
}: ProductDetailsTabProps) {
  return (
    <Tabs.Panel value="details">
      <Stack gap="md">
        <Select
          label="Categoria"
          placeholder="Selecione..."
          data={categories.map((c) => ({
            value: c.id,
            label: c.name,
          }))}
          searchable
          required
          {...form.getInputProps("categoryId")}
        />
        <Select
          label="Material"
          placeholder="Selecione (Opcional)"
          data={materials.map((m) => ({
            value: m.id,
            label: m.name,
          }))}
          searchable
          clearable
          {...form.getInputProps("materialId")}
        />
        <Group mt="md">
          {isEditing && (
            <Switch
              label="Produto Ativo"
              {...form.getInputProps("active", { type: "checkbox" })}
            />
          )}
          <Switch
            label="Destaque na loja"
            {...form.getInputProps("featured", { type: "checkbox" })}
          />
        </Group>
      </Stack>
    </Tabs.Panel>
  );
}
