import Image from "next/image";
import {
  Box,
  Button,
  ColorInput,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";

export interface StoreFormValues {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone: string;
  email: string;
  logoUrl?: string;
  primaryColor?: string | null;
}

interface StoreSettingsFormProps {
  store: StoreFormValues;
  saving: boolean;
  uploadingLogo: boolean;
  logoPreviewUrl?: string;
  onChange<K extends keyof StoreFormValues>(
    key: K,
    value: StoreFormValues[K]
  ): void;
  onUploadLogo(file: File): void;
  onSubmit(): void;
}

export function StoreSettingsForm({
  store,
  saving,
  uploadingLogo,
  logoPreviewUrl,
  onChange,
  onUploadLogo,
  onSubmit,
}: StoreSettingsFormProps) {
  return (
    <Box
      style={{
        borderRadius: 18,
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow:
          "0 16px 35px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(148, 163, 184, 0.18)",
        maxWidth: 640,
      }}
    >
      <Stack gap="md">
        <Group align="flex-start" justify="space-between">
          <Stack gap={4} style={{ flex: 1 }}>
            <TextInput
              label="Nome da loja"
              value={store.name}
              onChange={(event) => onChange("name", event.currentTarget.value)}
              required
            />

            <TextInput
              label="Email"
              value={store.email}
              onChange={(event) => onChange("email", event.currentTarget.value)}
              required
            />

            <TextInput
              label="Telefone"
              value={store.phone}
              onChange={(event) => onChange("phone", event.currentTarget.value)}
              required
            />
          </Stack>

          <Stack gap="xs" style={{ width: 180, alignItems: "center" }}>
            <Text size="sm" fw={500}>
              Logo da loja
            </Text>
            <Box
              style={{
                width: 120,
                height: 120,
                borderRadius: 20,
                border: "1px dashed rgba(148, 163, 184, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                backgroundColor: "#f9fafb",
                position: "relative",
              }}
            >
              {logoPreviewUrl ? (
                <Image
                  src={logoPreviewUrl}
                  alt="Logo da loja"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="120px"
                />
              ) : (
                <Text size="xs" c="dimmed" ta="center" px="xs">
                  Nenhuma imagem selecionada
                </Text>
              )}
            </Box>
            <Button
              size="xs"
              variant="light"
              loading={uploadingLogo}
              component="label"
            >
              {store.logoUrl ? "Alterar logo" : "Enviar logo"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    onUploadLogo(file);
                  }
                }}
              />
            </Button>
          </Stack>
        </Group>

        <Textarea
          label="Descrição"
          placeholder="Descrição da sua loja"
          minRows={3}
          value={store.description ?? ""}
          onChange={(event) =>
            onChange("description", event.currentTarget.value)
          }
        />

        <TextInput
          label="Endereço"
          placeholder="Endereço físico (opcional)"
          value={store.address ?? ""}
          onChange={(event) => onChange("address", event.currentTarget.value)}
        />

        <Group gap="md" align="flex-end">
          <ColorInput
            label="Cor principal da loja"
            format="hex"
            value={store.primaryColor ?? ""}
            onChange={(value) => onChange("primaryColor", value || null)}
            disallowInput
            placeholder="#2563EB"
            style={{ maxWidth: 220 }}
          />
          <Group gap="xs">
            {store.primaryColor && (
              <Text size="xs" c="dimmed">
                Essa cor poderá ser usada no tema e em destaques visuais.
              </Text>
            )}
            <Button
              variant="subtle"
              size="xs"
              color="gray"
              onClick={() => onChange("primaryColor", null)}
              disabled={!store.primaryColor}
            >
              Remover cor
            </Button>
          </Group>
        </Group>

        <Group justify="flex-end" mt="md">
          <Button loading={saving} onClick={onSubmit}>
            Salvar alterações
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
