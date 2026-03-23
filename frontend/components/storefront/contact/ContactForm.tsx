import { IStore } from "@ecomerce/shared";
import { ActionIcon, Button, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { FiCheck, FiSend } from "react-icons/fi";
import { FormCard } from "./styles";

interface ContactFormProps {
  primaryColor?: string | null;
}

export function ContactForm({ primaryColor }: ContactFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },

    validate: {
      name: (value) => (value.length < 2 ? "Nome muito curto" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      subject: (value) => (value.length < 5 ? "Assunto muito curto" : null),
      message: (value) => (value.length < 10 ? "Mensagem muito curta" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form values:", values);
    
    notifications.show({
      title: "Mensagem enviada!",
      message: "Recebemos seu contato e retornaremos em breve.",
      color: "green",
      icon: <FiCheck size={18} />,
    });
    
    form.reset();
    setLoading(false);
  };

  return (
    <FormCard>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group grow mb="md">
          <TextInput
            label="Seu Nome"
            placeholder="Digite seu nome completo"
            size="md"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Seu Email"
            placeholder="exemplo@email.com"
            size="md"
            withAsterisk
            {...form.getInputProps("email")}
          />
        </Group>

        <TextInput
          label="Assunto"
          placeholder="Sobre o que você quer falar?"
          size="md"
          mb="md"
          withAsterisk
          {...form.getInputProps("subject")}
        />

        <Textarea
          label="Mensagem"
          placeholder="Digite sua mensagem aqui..."
          size="md"
          minRows={5}
          mb="xl"
          withAsterisk
          {...form.getInputProps("message")}
        />

        <Button
          type="submit"
          size="lg"
          color={primaryColor || "brand"}
          fullWidth
          loading={loading}
          leftSection={<FiSend size={18} />}
        >
          Enviar Mensagem
        </Button>
      </form>
    </FormCard>
  );
}
