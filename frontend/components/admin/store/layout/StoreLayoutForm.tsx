import { Box, Button, Group, Tabs, Paper } from '@mantine/core';
import { IStoreLayout } from '@ecomerce/shared';
import { HeroSectionForm } from './HeroSectionForm';
import { AboutSectionForm } from './AboutSectionForm';
import { FeedbacksSectionForm } from './FeedbacksSectionForm';

interface StoreLayoutFormProps {
  values: Partial<IStoreLayout>;
  onChange: (key: keyof IStoreLayout, value: any) => void;
  onUploadImage: (file: File, field: 'heroBackgroundImage' | 'aboutImage') => void;
  uploading: boolean;
  onSave: () => void;
  saving: boolean;
}

export function StoreLayoutForm({ values, onChange, onUploadImage, uploading, onSave, saving }: StoreLayoutFormProps) {
  return (
    <Box>
      <Tabs defaultValue="hero">
        <Tabs.List mb="md">
          <Tabs.Tab value="hero">Hero (Banner)</Tabs.Tab>
          <Tabs.Tab value="about">Sobre</Tabs.Tab>
          <Tabs.Tab value="feedbacks">Feedbacks</Tabs.Tab>
        </Tabs.List>

        <Paper p="md" withBorder radius="md">
          <Tabs.Panel value="hero">
            <HeroSectionForm 
              values={values} 
              onChange={onChange} 
              onUploadImage={onUploadImage} 
              uploading={uploading} 
            />
          </Tabs.Panel>

          <Tabs.Panel value="about">
            <AboutSectionForm 
              values={values} 
              onChange={onChange} 
              onUploadImage={onUploadImage} 
              uploading={uploading} 
            />
          </Tabs.Panel>

          <Tabs.Panel value="feedbacks">
            <FeedbacksSectionForm 
              values={values} 
              onChange={onChange} 
            />
          </Tabs.Panel>
        </Paper>
      </Tabs>

      <Group justify="flex-end" mt="lg">
        <Button loading={saving} onClick={onSave}>Salvar Alterações</Button>
      </Group>
    </Box>
  );
}
