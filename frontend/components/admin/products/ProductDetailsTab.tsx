import { Group, MultiSelect, Select, Stack, Switch, Tabs } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type {
  IProductCategory,
  IProductMaterial,
  IVehicle,
} from "@ecomerce/shared";
import type { ProductFormValues } from "./ProductFormModal";

interface ProductDetailsTabProps {
  form: UseFormReturnType<ProductFormValues>;
  categories: IProductCategory[];
  materials: IProductMaterial[];
  vehicles: IVehicle[];
  isEditing: boolean;
}

export function ProductDetailsTab({
  form,
  categories,
  materials,
  vehicles,
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
        <MultiSelect
          label="Veículos compatíveis"
          placeholder="Selecione os veículos (Opcional)"
          data={vehicles.map((vehicle) => ({
            value: vehicle.id,
            label: `${vehicle.make} • ${vehicle.model} • ${vehicle.year}`,
          }))}
          searchable
          clearable
          {...form.getInputProps("compatibleVehicleIds")}
        />
        <Group mt="md">
          <Switch
            label="Destaque na loja"
            {...form.getInputProps("featured", { type: "checkbox" })}
          />
        </Group>
      </Stack>
    </Tabs.Panel>
  );
}
