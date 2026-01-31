import {
  Button,
  Card,
  Center,
  Container,
  Group,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FiAlertCircle, FiSearch } from "react-icons/fi";
import {
  CopyrightText,
  NotFoundIconWrapper,
  NotFoundPageWrapper,
  StyledThemeIcon
} from "./styles";

interface StoreNotFoundProps {
  subdomainInput: string;
  setSubdomainInput: (value: string) => void;
  handleSimulate: () => void;
}

export function StoreNotFound({
  subdomainInput,
  setSubdomainInput,
  handleSimulate,
}: StoreNotFoundProps) {
  return (
    <NotFoundPageWrapper>
      <Container size="sm">
        <Card
          padding={50}
          radius="lg"
          shadow="xl"
          style={{ textAlign: "center", overflow: "visible" }}
        >
          <NotFoundIconWrapper>
            <StyledThemeIcon
              size={120}
              radius="100%"
              variant="filled"
              color="red"
            >
              <FiAlertCircle size={60} />
            </StyledThemeIcon>
          </NotFoundIconWrapper>

          <Stack gap="md" align="center">
            <Title order={2} size={32} fw={800} c="dark.8">
              Loja não encontrada
            </Title>

            <Text c="dimmed" size="lg" maw={400} mx="auto">
              O endereço que você tentou acessar não corresponde a nenhuma loja
              ativa em nossa plataforma.
            </Text>

            {process.env.NODE_ENV === "development" && (
              <Card
                withBorder
                radius="md"
                p="lg"
                bg="gray.0"
                mt="xl"
                w="100%"
              >
                <Stack gap="xs" align="flex-start">
                  <Group gap="xs">
                    <ThemeIcon variant="light" color="blue" size="sm">
                      <FiSearch size={12} />
                    </ThemeIcon>
                    <Text size="sm" fw={700} tt="uppercase" c="blue.8">
                      Modo Desenvolvedor
                    </Text>
                  </Group>

                  <Text size="sm" c="dimmed" ta="left">
                    Digite o subdomínio da loja que deseja testar:
                  </Text>

                  <Group w="100%">
                    <TextInput
                      placeholder="ex: primarystore"
                      value={subdomainInput}
                      onChange={(e) => setSubdomainInput(e.target.value)}
                      style={{ flex: 1 }}
                      leftSection={
                        <span style={{ color: "#adb5bd", fontSize: 12 }}>
                          https://
                        </span>
                      }
                      rightSection={
                        <span style={{ color: "#adb5bd", fontSize: 12 }}>
                          .localhost
                        </span>
                      }
                      rightSectionWidth={80}
                    />
                    <Button onClick={handleSimulate} color="blue">
                      Acessar Loja
                    </Button>
                  </Group>

                  <Text size="xs" c="dimmed">
                    Dica: Use <b>primarystore</b> para acessar a loja de
                    exemplo.
                  </Text>
                </Stack>
              </Card>
            )}
          </Stack>
        </Card>

        <Center mt="xl">
          <CopyrightText>
            © {new Date().getFullYear()} Ecommerce SaaS Platform
          </CopyrightText>
        </Center>
      </Container>
    </NotFoundPageWrapper>
  );
}
