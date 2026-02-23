import { Button, ColorInput, Group, MultiSelect, Select, Stack, Switch, Tabs, TextInput } from "@mantine/core";
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
  const colors = form.values.colors || [];

  const handleColorNameChange = (index: number, value: string) => {
    const updated = [...colors];
    updated[index] = {
      ...updated[index],
      name: value,
      hex: value.trim().length === 0 ? "" : updated[index]?.hex || "#000000",
    };
    form.setFieldValue("colors", updated);
  };

  const handleColorHexChange = (index: number, value: string) => {
    const updated = [...colors];
    updated[index] = {
      ...updated[index],
      hex: value,
    };
    form.setFieldValue("colors", updated);
  };

  const handleAddColor = () => {
    if (colors.length >= 5) return;
    form.setFieldValue("colors", [...colors, { name: "", hex: "#000000" }]);
  };

  const handleRemoveColor = (index: number) => {
    const updated = colors.filter((_, i) => i !== index);
    form.setFieldValue("colors", updated);
  };

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
        <Stack gap="xs">
          {colors.map((color, index) => (
            <Group key={index} align="flex-end">
              <TextInput
                label={index === 0 ? "Cores do produto" : undefined}
                placeholder="Nome da cor"
                value={color.name}
                onChange={(event) =>
                  handleColorNameChange(index, event.currentTarget.value)
                }
                style={{ flex: 1 }}
              />
              {color.name.trim().length > 0 && (
                <ColorInput
                  label={index === 0 ? "Cor" : undefined}
                  format="hex"
                  value={color.hex}
                  onChange={(value) => handleColorHexChange(index, value)}
                  disallowInput
                  style={{ width: 140 }}
                />
              )}
              <Button
                variant="subtle"
                color="red"
                onClick={() => handleRemoveColor(index)}
              >
                Remover
              </Button>
            </Group>
          ))}
          {colors.length < 5 && (
            <Group justify="flex-start" mt="xs">
              <Button variant="light" onClick={handleAddColor}>
                Adicionar cor
              </Button>
            </Group>
          )}
        </Stack>
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
