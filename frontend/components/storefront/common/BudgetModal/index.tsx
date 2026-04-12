import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPublicCategories, fetchPublicMaterials } from "@/store/storefront/storefrontSlice";
import { IStore, StorePermission } from "@ecomerce/shared";
import {
  Button,
  Group,
  Modal,
  MultiSelect,
  Radio,
  Select,
  Stack,
  Stepper,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

interface BudgetModalProps {
  store: IStore;
  opened: boolean;
  onClose: () => void;
}

interface BudgetFormValues {
  name: string;
  phone: string;
  categoryIds: string[];
  materialId: string;
  vehicleDetails: string;
  pickupOption: string;
  friendName: string;
  deliveryDate: string;
  paymentMethod: string;
  observations: string;
}

export function BudgetModal({ store, opened, onClose }: BudgetModalProps) {
  const dispatch = useAppDispatch();
  const { items: materials, loading: materialsLoading } = useAppSelector((state) => state.storefront.materials);
  const { items: categories, loading: categoriesLoading } = useAppSelector((state) => state.storefront.categories);
  const [active, setActive] = useState(0);

  const canManageMaterials = store.permissions?.includes(StorePermission.MATERIAL_MANAGE);

  useEffect(() => {
    if (opened) {
      dispatch(fetchPublicCategories());
      if (canManageMaterials) dispatch(fetchPublicMaterials());
    }
  }, [opened, dispatch, canManageMaterials]);

  const form = useForm<BudgetFormValues>({
    initialValues: {
      name: "",
      phone: "",
      categoryIds: [],
      materialId: "",
      vehicleDetails: "",
      pickupOption: "owner",
      friendName: "",
      deliveryDate: "",
      paymentMethod: "",
      observations: "",
    },
    validate: {
      name: (v) => (active === 0 && v.trim().length < 2 ? "Nome muito curto" : null),
      phone: (v) => (active === 0 && v.trim().length < 10 ? "Telefone inválido" : null),
      categoryIds: (v) => (active === 1 && v.length === 0 ? "Selecione ao menos uma categoria" : null),
      materialId: (v) => (active === 1 && canManageMaterials && materials.length > 0 && !v ? "Selecione um material" : null),
      vehicleDetails: (v) => (active === 1 && v.trim().length === 0 ? "Informe os detalhes do veículo" : null),
      paymentMethod: (v) => (active === 2 && !v ? "Selecione uma forma de pagamento" : null),
      friendName: (v, values) => (active === 2 && values.pickupOption === "friend" && !v ? "Informe o nome do amigo" : null),
    },
  });

  const nextStep = () => {
    const result = form.validate();
    if (!result.hasErrors) {
      setActive((current) => (current < 2 ? current + 1 : current));
    }
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = (values: BudgetFormValues) => {
    const phoneDigits = store.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      notifications.show({
        title: "Erro",
        message: "WhatsApp da loja não configurado.",
        color: "red",
      });
      return;
    }

    const selectedMaterial = materials.find((m) => m.id === values.materialId);
    const selectedCategoriesNames = categories
      .filter((c) => values.categoryIds.includes(c.id))
      .map((c) => c.name);

    const message = [
      `*Solicitação de Orçamento - ${store.name}*`,
      "----------------------------",
      `*Cliente:* ${values.name}`,
      `*WhatsApp:* ${values.phone}`,
      "",
      `*Categorias:* ${selectedCategoriesNames.join(", ")}`,
      canManageMaterials && selectedMaterial ? `*Material:* ${selectedMaterial.name}` : null,
      `*Veículo:* ${values.vehicleDetails}`,
      "",
      `*Data pretendida para entrega:* ${values.deliveryDate ? values.deliveryDate.split("-").reverse().join("/") : "Não informada"}`,
      `*Forma de Retirada:* ${values.pickupOption === "owner" ? "Retirada pelo Dono" : `Retirada por um Amigo (${values.friendName})`}`,
      `*Forma de Pagamento:* ${values.paymentMethod}`,
      "",
      values.observations ? `*Informações adicionais:* ${values.observations}` : null,
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    onClose();
    form.reset();
    setActive(0);
  };

  return (
    <Modal 
      opened={opened} 
      onClose={() => {
        onClose();
        setActive(0);
      }} 
      title="Fazer Orçamento" 
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
          <Stepper.Step label="Usuário" description="Dados básicos">
            <Stack gap="md" mt="xl">
              <TextInput
                label="Seu Nome"
                placeholder="Nome completo"
                required
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Seu WhatsApp"
                placeholder="(00) 00000-0000"
                required
                {...form.getInputProps("phone")}
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Produto" description="O que você precisa">
            <Stack gap="md" mt="xl">
              {categories.length > 0 && (
                <MultiSelect
                  label="Selecione as Categorias"
                  placeholder="Escolha as categorias"
                  data={categories.map((c) => ({ value: c.id, label: c.name }))}
                  {...form.getInputProps("categoryIds")}
                  searchable
                  required
                />
              )}

              {canManageMaterials && materials.length > 0 && (
                <Select
                  label="Selecione o Material"
                  placeholder="Escolha um material"
                  data={materials.map((m) => ({ value: m.id, label: m.name }))}
                  {...form.getInputProps("materialId")}
                  clearable
                  required
                />
              )}

              <TextInput
                label="Veículo (Marca, Modelo e Ano)"
                placeholder="Ex: Volvo FH 2020"
                required
                {...form.getInputProps("vehicleDetails")}
              />

              <Textarea
                label="Informações adicionais"
                placeholder="Ex: Gostaria de um orçamento capa de banco..."
                minRows={4}
                {...form.getInputProps("observations")}
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Entrega" description="Data e retirada">
            <Stack gap="md" mt="xl">
              <TextInput
                label="Data pretendida para entrega"
                type="date"
                {...form.getInputProps("deliveryDate")}
              />

              <Radio.Group
                label="Quem irá retirar?"
                {...form.getInputProps("pickupOption")}
              >
                <Group mt="xs">
                  <Radio value="owner" label="Eu mesmo (Dono)" />
                  <Radio value="friend" label="Um amigo" />
                </Group>
              </Radio.Group>

              {form.values.pickupOption === "friend" && (
                <TextInput
                  label="Nome do amigo que irá retirar"
                  placeholder="Digite o nome completo"
                  required
                  {...form.getInputProps("friendName")}
                />
              )}

              <Select
                label="Forma de Pagamento"
                placeholder="Selecione"
                required
                data={[
                  { value: "Pix", label: "Pix" },
                  { value: "Cartão de crédito", label: "Cartão de crédito" },
                  { value: "Cartão de débito", label: "Cartão de débito" },
                  { value: "Dinheiro", label: "Dinheiro" },
                ]}
                {...form.getInputProps("paymentMethod")}
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Completed>
            <Stack align="center" mt="xl">
              <p>Tudo pronto para enviar seu orçamento!</p>
            </Stack>
          </Stepper.Completed>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Anterior
            </Button>
          )}
          {active < 2 ? (
            <Button onClick={nextStep} color="brand">Próximo</Button>
          ) : (
            <Button type="submit" color="brand">
              Solicitar Orçamento via WhatsApp
            </Button>
          )}
        </Group>
      </form>
    </Modal>
  );
}
