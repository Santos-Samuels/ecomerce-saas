import { Checkbox, Group, NumberInput, Stack, Tabs } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { ProductFormValues } from "./ProductFormModal";

interface ProductPricingTabProps {
  form: UseFormReturnType<ProductFormValues>;
}

export function ProductPricingTab({ form }: ProductPricingTabProps) {
  return (
    <Tabs.Panel value="pricing">
      <Stack gap="md">
        <Group grow align="flex-end">
          <NumberInput
            label="Preço (R$)"
            placeholder="0,00"
            required
            min={0}
            decimalScale={2}
            fixedDecimalScale
            prefix="R$ "
            {...form.getInputProps("price")}
          />
          <NumberInput
            label="Preço Promocional (R$)"
            placeholder="0,00"
            min={0}
            max={form.values.price}
            decimalScale={2}
            fixedDecimalScale
            prefix="R$ "
            {...form.getInputProps("promotionalPrice")}
          />
        </Group>
        <Group grow align="flex-end">
          <NumberInput
            label="Estoque"
            placeholder="1"
            required={!form.values.infiniteStock}
            min={1}
            allowDecimal={false}
            disabled={form.values.infiniteStock}
            {...form.getInputProps("stock")}
          />
          <Checkbox
            label="Estoque Infinito"
            {...form.getInputProps("infiniteStock", { type: "checkbox" })}
          />
        </Group>
      </Stack>
    </Tabs.Panel>
  );
}
