import { Box, FileButton, Button, Group, Stack, Text, TextInput, Image } from '@mantine/core';
import { IStoreLayout } from '@ecomerce/shared';

interface HeroSectionFormProps {
  values: Partial<IStoreLayout>;
  onChange: (key: keyof IStoreLayout, value: string | boolean | null) => void;
  onUploadImage: (file: File, field: 'heroBackgroundImage') => void;
  uploading: boolean;
}

export function HeroSectionForm({ values, onChange, onUploadImage, uploading }: HeroSectionFormProps) {
  return (
    <Stack gap="md">
      <Text size="lg" fw={600}>Seção Hero (Banner Principal)</Text>
      <Text size="sm" c="dimmed">
        Personalize o banner principal da sua loja. Esta é a primeira coisa que seus clientes verão ao acessar o site. 
        Escolha uma imagem de alta qualidade e textos curtos e impactantes para atrair a atenção.
      </Text>
      
      <TextInput
        label="Título Principal"
        placeholder="Ex: As melhores ofertas para você"
        value={values.heroTitle || ''}
        onChange={(e) => onChange('heroTitle', e.currentTarget.value)}
      />
      
      <TextInput
        label="Subtítulo"
        placeholder="Ex: Confira nossos produtos exclusivos"
        value={values.heroSubtitle || ''}
        onChange={(e) => onChange('heroSubtitle', e.currentTarget.value)}
      />
      
      <Group grow>
        <TextInput
          label="Texto do Botão"
          placeholder="Ex: Comprar Agora"
          value={values.heroButtonText || ''}
          onChange={(e) => onChange('heroButtonText', e.currentTarget.value)}
        />
        <TextInput
          label="Link do Botão"
          placeholder="Ex: /produtos"
          value={values.heroButtonLink || ''}
          onChange={(e) => onChange('heroButtonLink', e.currentTarget.value)}
        />
      </Group>

      <Box>
        <Text size="sm" fw={500} mb="xs">Imagem de Fundo</Text>
        {values.heroBackgroundImage && (
          <Image
            src={values.heroBackgroundImage}
            alt="Hero Background"
            radius="md"
            h={200}
            w="100%"
            fit="cover"
            mb="sm"
          />
        )}
        <FileButton onChange={(file) => file && onUploadImage(file, 'heroBackgroundImage')} accept="image/png,image/jpeg">
          {(props) => <Button {...props} loading={uploading} variant="outline">Alterar Imagem</Button>}
        </FileButton>
      </Box>
    </Stack>
  );
}
