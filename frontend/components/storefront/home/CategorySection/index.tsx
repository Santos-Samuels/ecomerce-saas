import { IProductCategory } from "@ecomerce/shared";
import { Container, Grid, Paper, Title } from "@mantine/core";
import Link from "next/link";
import styled from "styled-components";

const CardWrapper = styled.div<{ primaryColor?: string }>`
  height: 100%;
  
  .mantine-Paper-root {
    cursor: pointer;
    transition: all 0.2s ease;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: ${({ primaryColor }) => primaryColor || "brand"};
    }
  }
`;

const SectionWrapper = styled.div`
  padding: 40px 0;
`;

interface CategorySectionProps {
  primaryColor?: string | null;
  categories: IProductCategory[];
}

export function CategorySection({ primaryColor, categories }: CategorySectionProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <SectionWrapper>
      <Container size="xl">
        <Title order={2} mb={32} ta="center">
          Navegue por Categorias
        </Title>
        <Grid>
          {categories.map((category) => (
            <Grid.Col key={category.id} span={{ base: 6, sm: 4, md: 3 }}>
              <Link
                href={`/products?category=${category.id}`}
                style={{ textDecoration: "none" }}
              >
                <CardWrapper primaryColor={primaryColor ?? undefined}>
                  <Paper p="xl" radius="md" withBorder shadow="sm">
                    <Title order={4} ta="center" size="h5">
                      {category.name}
                    </Title>
                  </Paper>
                </CardWrapper>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
}
