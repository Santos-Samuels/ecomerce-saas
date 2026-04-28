import { IStoreLayout } from "@ecomerce/shared";
import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { useBudget } from "../../common/BudgetModal/BudgetContext";
import {
  HeroContent,
  HeroSubtitle,
  HeroTitle,
  HeroWrapper,
} from "./styles";

interface HeroSectionProps {
  layout: IStoreLayout;
  primaryColor?: string | null;
}

export function HeroSection({ layout, primaryColor }: HeroSectionProps) {
  const { openBudget } = useBudget();

  if (!layout.heroTitle && !layout.heroSubtitle && !layout.heroBackgroundImage) {
    return null;
  }

  const hasImage = !!layout.heroBackgroundImage;
  const hasTextContent =
    !!layout.heroTitle || !!layout.heroSubtitle || !!layout.heroButtonText;

  return (
    <HeroWrapper
      $backgroundImage={layout.heroBackgroundImage}
      $contentless={!hasTextContent}
    >
      <HeroContent $hasImage={hasImage}>
        {layout.heroTitle && <HeroTitle>{layout.heroTitle}</HeroTitle>}
        {layout.heroSubtitle && (
          <HeroSubtitle>{layout.heroSubtitle}</HeroSubtitle>
        )}
        <Group mt="xl">
          {layout.heroButtonText && layout.heroButtonLink && (
            <Button
              component={Link}
              href={layout.heroButtonLink}
              size="lg"
              radius="md"
              color={primaryColor || "brand"}
            >
              {layout.heroButtonText}
            </Button>
          )}
          {layout.heroButtonText && !layout.heroButtonLink && <Button
            variant="white"
            size="lg"
            radius="md"
            onClick={openBudget}
            color={primaryColor || "brand"}
          >
            Fazer Orçamento
          </Button>}
        </Group>
      </HeroContent>
    </HeroWrapper>
  );
}
