import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Image,
  SimpleGrid,
  Stack,
  Tabs,
  Group,
  Text,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { FiUpload, FiX } from "react-icons/fi";
import type { ProductFormValues } from "./ProductFormModal";

interface ProductImagesTabProps {
  form: UseFormReturnType<ProductFormValues>;
  newFiles: File[];
  previews: string[];
  onAddFiles: (files: File[]) => void;
  onRemoveNewFile: (index: number) => void;
  onRemoveExistingImage: (index: number) => void;
}

export function ProductImagesTab({
  form,
  newFiles,
  previews,
  onAddFiles,
  onRemoveNewFile,
  onRemoveExistingImage,
}: ProductImagesTabProps) {
  return (
    <Tabs.Panel value="images">
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="sm" fw={500}>
            Galeria de Imagens
          </Text>
          <FileButton
            onChange={onAddFiles}
            accept="image/png,image/jpeg,image/webp"
            multiple
          >
            {(props) => (
              <Button
                {...props}
                variant="light"
                size="xs"
                leftSection={<FiUpload size={14} />}
              >
                Adicionar Imagens
              </Button>
            )}
          </FileButton>
        </Group>

        {form.values.images.length === 0 && newFiles.length === 0 ? (
          <Text c="dimmed" size="sm" ta="center" py="xl">
            Nenhuma imagem selecionada.
          </Text>
        ) : (
          <SimpleGrid cols={3} spacing="sm">
            {form.values.images.map((url, index) => (
              <Box key={`existing-${index}`} style={{ position: "relative" }}>
                <Image
                  src={url}
                  radius="sm"
                  h={100}
                  fit="cover"
                  alt={`Imagem ${index + 1}`}
                />
                <ActionIcon
                  color="red"
                  variant="filled"
                  size="xs"
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                  }}
                  onClick={() => onRemoveExistingImage(index)}
                >
                  <FiX size={12} />
                </ActionIcon>
              </Box>
            ))}

            {previews.map((url, index) => (
              <Box
                key={`new-${index}`}
                style={{ position: "relative", opacity: 0.8 }}
              >
                <Image
                  src={url}
                  radius="sm"
                  h={100}
                  fit="cover"
                  alt={`Nova imagem ${index + 1}`}
                />
                <ActionIcon
                  color="red"
                  variant="filled"
                  size="xs"
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                  }}
                  onClick={() => onRemoveNewFile(index)}
                >
                  <FiX size={12} />
                </ActionIcon>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Tabs.Panel>
  );
}
