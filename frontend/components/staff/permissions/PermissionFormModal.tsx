import { useForm } from "@mantine/form";
import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { PermissionRow } from "./PermissionsTable";

interface PermissionFormValues {
  id?: string;
  code: string;
  name: string;
  description?: string;
}

interface PermissionFormModalProps {
  opened: boolean;
  loading: boolean;
  initialValues?: PermissionRow | null;
  onClose(): void;
  onSubmit(values: PermissionFormValues): void;
}

export function PermissionFormModal({
  opened,
  loading,
  initialValues,
  onClose,
  onSubmit,
}: PermissionFormModalProps) {
  const form = useForm<PermissionFormValues>({
    initialValues: {
      id: initialValues?.id,
      code: initialValues?.code ?? "",
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
    },
    validate: {
      code: (value) =>
        value.trim().length === 0 ? "Código é obrigatório" : null,
      name: (value) =>
        value.trim().length === 0 ? "Nome é obrigatório" : null,
    },
  });

  const handleSubmit = (values: PermissionFormValues) => {
    onSubmit(values);
  };

  const isEditing = Boolean(initialValues?.id);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditing ? "Editar permissão" : "Nova permissão"}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="sm">
          <TextInput
            label="Código"
            placeholder="Ex: VEHICLE_MANAGE"
            disabled={isEditing}
            autoFocus={!isEditing}
            {...form.getInputProps("code")}
          />
          <TextInput
            label="Nome"
            placeholder="Nome legível da permissão"
            {...form.getInputProps("name")}
          />
          <Textarea
            label="Descrição"
            placeholder="Explique o que essa permissão libera"
            minRows={3}
            autosize
            {...form.getInputProps("description")}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" loading={loading}>
              {isEditing ? "Salvar alterações" : "Cadastrar"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
