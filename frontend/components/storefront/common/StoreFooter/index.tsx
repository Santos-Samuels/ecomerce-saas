import { IStore } from "@ecomerce/shared";
import { Button, Card, Container, Group, Text, TextInput } from "@mantine/core";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import {
  ContactItem,
  Copyright,
  FooterGrid,
  FooterSection,
  FooterTitle,
  FooterWrapper,
  SocialLink,
  SocialLinks,
} from "./styles";

interface StoreFooterProps {
  store: IStore | null;
  subdomainInput: string;
  setSubdomainInput: (value: string) => void;
  handleSimulate: () => void;
}

export function StoreFooter({
  store,
  subdomainInput,
  setSubdomainInput,
  handleSimulate,
}: StoreFooterProps) {
  if (!store) return null;

  return (
    <FooterWrapper>
      <Container size="lg">
        <FooterGrid>
          <FooterSection>
            <FooterTitle>{store.name}</FooterTitle>
            <SocialLinks>
              {store.instagramHandle && (
                <SocialLink
                  href={`https://instagram.com/${store.instagramHandle.replace("@", "")}`}
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </SocialLink>
              )}
              {store.phone && (
                <SocialLink
                  href={`https://wa.me/${store.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </SocialLink>
              )}
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Links Rápidos</FooterTitle>
            <ContactItem as="a" href="/" style={{ textDecoration: "none", cursor: "pointer" }}>
              Início
            </ContactItem>
            <ContactItem as="a" href="products" style={{ textDecoration: "none", cursor: "pointer" }}>
              Produtos
            </ContactItem>
            <ContactItem as="a" href="contact" style={{ textDecoration: "none", cursor: "pointer" }}>
              Fale Conosco
            </ContactItem>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Contato</FooterTitle>
            {store.address && (
              <ContactItem>
                <FiMapPin size={18} />
                <span>{store.address}</span>
              </ContactItem>
            )}
            {store.phone && (
              <ContactItem>
                <FiPhone size={18} />
                <span>{store.phone}</span>
              </ContactItem>
            )}
            {store.email && (
              <ContactItem>
                <FiMail size={18} />
                <span>{store.email}</span>
              </ContactItem>
            )}
          </FooterSection>
        </FooterGrid>

        <Copyright>
          <Text size="sm" c="dimmed">
            © {new Date().getFullYear()} {store.name}. Todos os direitos reservados.
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
        </Copyright>
      </Container>
    </FooterWrapper>
  );
}
