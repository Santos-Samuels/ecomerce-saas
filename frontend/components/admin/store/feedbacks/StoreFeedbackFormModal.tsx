import { useForm } from "@mantine/form";
import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Button,
  Group,
  Rating,
  Text,
} from "@mantine/core";
import { IStoreFeedback } from "@ecomerce/shared";

interface StoreFeedbackFormValues {
  customerName: string;
  comment: string;
  stars: number;
}

interface StoreFeedbackFormModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: StoreFeedbackFormValues) => void;
  initialValues?: IStoreFeedback | null;
  loading?: boolean;
}

export function StoreFeedbackFormModal({
  opened,
  onClose,
  onSubmit,
  initialValues,
  loading,
}: StoreFeedbackFormModalProps) {
  const initialFormValues: StoreFeedbackFormValues = initialValues
    ? {
        customerName: initialValues.customerName,
        comment: initialValues.comment,
        stars: initialValues.stars,
      }
    : {
        customerName: "",
        comment: "",
        stars: 5,
      };

  const form = useForm<StoreFeedbackFormValues>({
    initialValues: initialFormValues,
    validate: {
      customerName: (value) =>
        value.trim().length < 2 ? "Nome deve ter pelo menos 2 caracteres" : null,
      comment: (value) =>
        value.trim().length < 10
          ? "Comentário deve ter pelo menos 10 caracteres"
          : null,
    },
  });

  const handleSubmit = (values: StoreFeedbackFormValues) => {
    onSubmit(values);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialValues ? "Editar Feedback" : "Novo Feedback"}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Nome do Cliente"
            placeholder="Ex: João da Silva"
            {...form.getInputProps("customerName")}
            required
          />

          <Stack gap={4}>
            <Text size="sm" fw={500}>
              Avaliação
            </Text>
            <Rating {...form.getInputProps("stars")} />
          </Stack>

          <Textarea
            label="Comentário"
            placeholder="O que o cliente disse..."
            minRows={3}
            {...form.getInputProps("comment")}
            required
          />

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
