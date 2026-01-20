import { Stack, Text, Switch, Alert } from '@mantine/core';
import { IStoreLayout } from '@ecomerce/shared';
import { FiInfo } from 'react-icons/fi';

interface FeedbacksSectionFormProps {
  values: Partial<IStoreLayout>;
  onChange: (key: keyof IStoreLayout, value: any) => void;
}

export function FeedbacksSectionForm({ values, onChange }: FeedbacksSectionFormProps) {
  return (
    <Stack gap="md">
      <Text size="lg" fw={600}>Seção de Feedbacks</Text>
      <Text size="sm" c="dimmed">
        A prova social é fundamental para conquistar a confiança de novos compradores. 
        Ative esta seção para exibir os depoimentos mais recentes dos seus clientes na página inicial.
      </Text>
      
      <Switch
        label="Exibir seção de feedbacks na página inicial"
        checked={values.showFeedbacks ?? true}
        onChange={(e) => onChange('showFeedbacks', e.currentTarget.checked)}
      />

      <Alert icon={<FiInfo size={16} />} title="Informação" color="blue">
        Os feedbacks exibidos serão os mais recentes cadastrados no sistema.
        Você pode gerenciar os feedbacks no menu Loja {'>'} Feedbacks.
      </Alert>
    </Stack>
  );
}
