import { IStoreLayout } from "@ecomerce/shared";
import { Button } from "@mantine/core";
import Link from "next/link";
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
  if (!layout.heroTitle && !layout.heroSubtitle && !layout.heroBackgroundImage) {
    return null;
  }

  const hasImage = !!layout.heroBackgroundImage;

  return (
    <HeroWrapper $backgroundImage={layout.heroBackgroundImage}>
      <HeroContent $hasImage={hasImage}>
        {layout.heroTitle && <HeroTitle>{layout.heroTitle}</HeroTitle>}
        {layout.heroSubtitle && (
          <HeroSubtitle>{layout.heroSubtitle}</HeroSubtitle>
        )}
        {layout.heroButtonText && layout.heroButtonLink && (
          <Button
            component={Link}
            href={layout.heroButtonLink}
            size="lg"
            radius="md"
            color={primaryColor || "blue"}
          >
            {layout.heroButtonText}
          </Button>
        )}
      </HeroContent>
    </HeroWrapper>
  );
}
