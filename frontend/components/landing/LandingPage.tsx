"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";
import { FaWhatsapp } from "react-icons/fa";
import { FiLayout, FiSmartphone, FiTrendingUp } from "react-icons/fi";
import * as S from "./styles";

export function LandingPage() {
  const handleContact = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de entender melhor como funciona o Vende Mais para implementar no meu negócio.",
    );
    window.open(`https://wa.me/5575998578488?text=${message}`, "_blank");
  };

  return (
    <S.LandingWrapper>
      <S.Header>
        <S.Logo>Vende Mais</S.Logo>
        <Button variant="light" onClick={handleContact}>
          Falar com especialista
        </Button>
      </S.Header>

      <S.Hero>
        <S.StyledTitle order={1} className="title">
          O Ecossistema Completo para o seu E-commerce decolar
        </S.StyledTitle>
        <S.Subtitle>
          Muito mais que um catálogo. Uma plataforma robusta para gerenciar
          produtos, pagamentos, entregas e converter conversas em vendas reais.
        </S.Subtitle>
        <Group justify="center">
          <Button
            size="lg"
            radius="xl"
            color="blue"
            onClick={handleContact}
            leftSection={<FaWhatsapp size={20} />}
          >
            Começar minha jornada
          </Button>
          <Button
            size="lg"
            radius="xl"
            variant="outline"
            onClick={() => (window.location.href = "/admin/login")}
          >
            Acessar Painel
          </Button>
        </Group>
      </S.Hero>

      <S.Features>
        <Container size="lg">
          <Title order={2} ta="center" mb={50}>
            Sua loja pronta para o próximo nível
          </Title>
          <S.FeaturesGrid>
            <S.FeatureCard>
              <FiLayout
                size={40}
                color="#228be6"
                style={{ marginBottom: 15 }}
              />
              <Title order={3} mb={10}>
                Loja Virtual Completa
              </Title>
              <Text c="dimmed">
                Sua vitrine profissional com gestão de estoque, categorias e
                controle total sobre seus produtos em uma interface moderna.
              </Text>
            </S.FeatureCard>

            <S.FeatureCard>
              <FiSmartphone
                size={40}
                color="#228be6"
                style={{ marginBottom: 15 }}
              />
              <Title order={3} mb={10}>
                Gestão Centralizada
              </Title>
              <Text c="dimmed">
                Acompanhe cada etapa da jornada do seu cliente através de um
                painel administrativo intuitivo e poderoso.
              </Text>
            </S.FeatureCard>

            <S.FeatureCard>
              <FiTrendingUp
                size={40}
                color="#228be6"
                style={{ marginBottom: 15 }}
              />
              <Title order={3} mb={10}>
                Sua Marca em Destaque
              </Title>
              <Text c="dimmed">
                Domínio personalizado e identidade visual própria. Dê ao seu
                negócio a credibilidade que ele merece no mundo digital.
              </Text>
            </S.FeatureCard>
          </S.FeaturesGrid>
        </Container>
      </S.Features>

      <S.CTASection>
        <Container size="sm">
          <Title order={2} mb={20}>
            Não apenas venda, construa uma marca.
          </Title>
          <Text mb={40} size="lg">
            Estamos evoluindo para ser a solução definitiva de vendas online
            para o seu negócio.
          </Text>
          <Button
            size="xl"
            radius="xl"
            variant="white"
            color="blue"
            onClick={handleContact}
          >
            Solicitar Demonstração
          </Button>
        </Container>
      </S.CTASection>

      <S.Footer>
        <Text>
          © {new Date().getFullYear()} Vende Mais - O seu SAAS de vendas
          simplificadas.
        </Text>
      </S.Footer>
    </S.LandingWrapper>
  );
}
