import { useForm } from "@mantine/form";
import {
  Button,
  Group,
  Modal,
  MultiSelect,
  Stack,
  TextInput,
} from "@mantine/core";
import type { StaffRoleRow } from "./RolesTable";

interface RoleFormValues {
  id?: string;
  name: string;
  permissions: string[];
}

interface RoleFormModalProps {
  opened: boolean;
  loading: boolean;
  initialValues?: StaffRoleRow | null;
  permissionOptions: Array<{ value: string; label: string }>;
  onClose(): void;
  onSubmit(values: RoleFormValues): void;
}

export function RoleFormModal({
  opened,
  loading,
  initialValues,
  permissionOptions,
  onClose,
  onSubmit,
}: RoleFormModalProps) {
  const form = useForm<RoleFormValues>({
    initialValues: {
      id: initialValues?.id,
      name: initialValues?.name ?? "",
      permissions: initialValues?.permissions ?? [],
    },
    validate: {
      name: (value) =>
        value.trim().length === 0 ? "Nome é obrigatório" : null,
    },
  });

  const handleSubmit = (values: RoleFormValues) => {
    onSubmit(values);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialValues?.id ? "Editar papel" : "Novo papel"}
      centered
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Nome do papel"
            placeholder="ex: staff, admin, customer"
            required
            {...form.getInputProps("name")}
          />

          <MultiSelect
            label="Permissões"
            placeholder="Selecione as permissões"
            data={permissionOptions}
            value={form.values.permissions}
            onChange={(vals) => form.setFieldValue("permissions", vals)}
            searchable
            nothingFoundMessage="Nenhuma permissão"
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" loading={loading}>
              {initialValues?.id ? "Salvar alterações" : "Criar papel"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

