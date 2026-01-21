import { Container, Text, Group, Card, TextInput, Button } from "@mantine/core";

interface StoreFooterProps {
  storeName?: string;
  subdomainInput: string;
  setSubdomainInput: (value: string) => void;
  handleSimulate: () => void;
}

export function StoreFooter({
  storeName,
  subdomainInput,
  setSubdomainInput,
  handleSimulate,
}: StoreFooterProps) {
  return (
    <footer
      style={{
        borderTop: "1px solid #e9ecef",
        backgroundColor: "white",
        marginTop: "auto",
        padding: "40px 0",
      }}
    >
      <Container size="lg">
        <Group justify="space-between" align="center">
          <Text size="sm" c="dimmed">
            © {new Date().getFullYear()} {storeName || "Ecommerce SaaS"}. Todos
            os direitos reservados.
          </Text>

          {process.env.NODE_ENV === "development" && (
            <Card withBorder padding="xs" radius="sm" bg="gray.0">
              <Text size="xs" fw={700} mb={4} c="dimmed">
                TROCAR LOJA (DEV)
              </Text>
              <Group gap={5}>
                <TextInput
                  placeholder="subdomínio"
                  value={subdomainInput}
                  onChange={(e) => setSubdomainInput(e.target.value)}
                  size="xs"
                  w={150}
                />
                <Button onClick={handleSimulate} size="xs" variant="default">
                  Ir
                </Button>
              </Group>
            </Card>
          )}
        </Group>
      </Container>
    </footer>
  );
}
