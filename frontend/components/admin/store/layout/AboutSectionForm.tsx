import { Box, FileButton, Button, Stack, Text, TextInput, Textarea, Image } from '@mantine/core';
import { IStoreLayout } from '@ecomerce/shared';

interface AboutSectionFormProps {
  values: Partial<IStoreLayout>;
  onChange: (key: keyof IStoreLayout, value: any) => void;
  onUploadImage: (file: File, field: 'aboutImage') => void;
  uploading: boolean;
}

export function AboutSectionForm({ values, onChange, onUploadImage, uploading }: AboutSectionFormProps) {
  return (
    <Stack gap="md">
      <Text size="lg" fw={600}>Seção Sobre</Text>
      <Text size="sm" c="dimmed">
        Conte a história da sua marca para gerar conexão com seus clientes. 
        Utilize este espaço para falar sobre seus valores, missão e diferenciais.
      </Text>
      
      <TextInput
        label="Título"
        placeholder="Ex: Sobre a nossa loja"
        value={values.aboutTitle || ''}
        onChange={(e) => onChange('aboutTitle', e.currentTarget.value)}
      />
      
      <Textarea
        label="Descrição"
        placeholder="Conte um pouco sobre a história da loja..."
        minRows={4}
        value={values.aboutDescription || ''}
        onChange={(e) => onChange('aboutDescription', e.currentTarget.value)}
      />

      <Box>
        <Text size="sm" fw={500} mb="xs">Imagem da Seção</Text>
        {values.aboutImage && (
          <Image
            src={values.aboutImage}
            alt="About Section"
            radius="md"
            h={200}
            w="auto"
            fit="contain"
            mb="sm"
          />
        )}
        <FileButton onChange={(file) => file && onUploadImage(file, 'aboutImage')} accept="image/png,image/jpeg">
          {(props) => <Button {...props} loading={uploading} variant="outline">Alterar Imagem</Button>}
        </FileButton>
      </Box>
    </Stack>
  );
}
