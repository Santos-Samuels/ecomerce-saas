import {
  Button,
  ColorInput,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IProductMaterial } from "@ecomerce/shared";
import { useEffect, useState } from "react";

interface FormState {
  id?: string;
  name: string;
  description?: string;
  colorName: string;
  colorHex: string;
  active: boolean;
}

interface MaterialFormModalProps {
  opened: boolean;
  saving: boolean;
  material?: IProductMaterial;
  onClose(): void;
  onSubmit(values: FormState): void;
}

export function MaterialFormModal({
  opened,
  saving,
  material,
  onClose,
  onSubmit,
}: MaterialFormModalProps) {
  const [form, setForm] = useState<FormState>({
    id: material?.id,
    name: material?.name ?? "",
    description: material?.description ?? "",
    colorName: material?.colorName ?? "",
    colorHex: material?.colorHex ?? "#000000",
    active: material?.active ?? true,
  });

  useEffect(() => {
    if (opened) {
      // eslint-disable-next-line
      setForm({
        id: material?.id,
        name: material?.name ?? "",
        description: material?.description ?? "",
        colorName: material?.colorName ?? "",
        colorHex: material?.colorHex ?? "#000000",
        active: material?.active ?? true,
      });
    }
  }, [opened, material]);

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleColorNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      colorName: value,
    }));
  };

  const handleSubmit = () => {
    const finalForm = { ...form };
    // Se não tiver nome de cor, limpa o hex também
    if (!finalForm.colorName || finalForm.colorName.trim() === "") {
      finalForm.colorName = "";
      finalForm.colorHex = "";
    }
    onSubmit(finalForm);
  };

  const isEditing = Boolean(form.id);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditing ? "Editar material" : "Novo material"}
      centered
    >
      <Stack gap="md">
        <TextInput
          label="Nome"
          placeholder="Nome do material"
          value={form.name}
          onChange={(event) => handleNameChange(event.currentTarget.value)}
          required
        />

        <TextInput
          label="Nome da cor"
          placeholder="Ex.: Azul marinho"
          value={form.colorName}
          onChange={(event) =>
            handleColorNameChange(event.currentTarget.value)
          }
        />

        {form.colorName.trim().length > 0 && (
          <ColorInput
            label="Cor"
            format="hex"
            value={form.colorHex}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                colorHex: value,
              }))
            }
            disallowInput
            required
          />
        )}

        <Textarea
          label="Descrição"
          placeholder="Descrição opcional do material"
          minRows={3}
          value={form.description}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setForm((prev) => ({
              ...prev,
              description: value,
            }));
          }}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancelar
          </Button>
          <Button loading={saving} onClick={handleSubmit}>
            {isEditing ? "Salvar alterações" : "Criar material"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
