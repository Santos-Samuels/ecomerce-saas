import { useEffect } from "react";
import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IVehicle } from "@ecomerce/shared";
import { SaveVehiclePayload } from "@/store/vehicles/types";

interface VehicleFormModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: SaveVehiclePayload) => void;
  loading?: boolean;
  vehicle?: IVehicle;
}

export function VehicleFormModal({
  opened,
  onClose,
  onSubmit,
  loading,
  vehicle,
}: VehicleFormModalProps) {
  const vehicleTypes = [
    "Carro",
    "Moto",
    "Caminhonete",
    "Caminhão",
    "SUV",
    "Van",
    "Ônibus",
  ];

  const form = useForm({
    initialValues: {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      type: "",
      active: true,
    },
    validate: {
      make: (value) =>
        value.trim().length === 0 ? "Fabricante é obrigatório" : null,
      model: (value) =>
        value.trim().length === 0 ? "Modelo é obrigatório" : null,
      year: (value) => (value < 1900 ? "Ano deve ser maior que 1900" : null),
      type: (value) =>
        value.trim().length === 0 ? "Tipo é obrigatório" : null,
    },
  });

  useEffect(() => {
    if (vehicle) {
      form.setValues({
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        type: vehicle.type,
        active: vehicle.active,
      });
    } else {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle]);

  const handleSubmit = (values: typeof form.values) => {
    onSubmit({
      id: vehicle?.id,
      ...values,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={vehicle ? "Editar Veículo" : "Novo Veículo"}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Fabricante"
            placeholder="Ex: Volvo"
            required
            {...form.getInputProps("make")}
          />

          <TextInput
            label="Modelo"
            placeholder="Ex: FH 540"
            required
            {...form.getInputProps("model")}
          />

          <NumberInput
            label="Ano"
            placeholder="Ex: 2023"
            required
            min={1900}
            max={new Date().getFullYear() + 1}
            allowDecimal={false}
            {...form.getInputProps("year")}
          />

          <Select
            label="Tipo"
            placeholder="Selecione o tipo de veículo"
            required
            data={vehicleTypes.map((type) => ({
              value: type,
              label: type,
            }))}
            {...form.getInputProps("type")}
          />

          {vehicle && (
            <Switch
              label="Ativo"
              {...form.getInputProps("active", { type: "checkbox" })}
            />
          )}

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={onClose} disabled={loading}>
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
