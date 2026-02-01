import { IStoreLayout } from "@ecomerce/shared";
import {
  AboutContainer,
  AboutContent,
  AboutDescription,
  AboutImageWrapper,
  AboutTitle,
  AboutWrapper,
} from "./styles";

interface AboutSectionProps {
  layout: IStoreLayout;
}

export function AboutSection({ layout }: AboutSectionProps) {
  if (!layout.aboutTitle && !layout.aboutDescription && !layout.aboutImage) {
    return null;
  }

  return (
    <AboutWrapper>
      <AboutContainer>
        <AboutContent>
          {layout.aboutTitle && <AboutTitle>{layout.aboutTitle}</AboutTitle>}
          {layout.aboutDescription && (
            <AboutDescription>{layout.aboutDescription}</AboutDescription>
          )}
        </AboutContent>
        {layout.aboutImage && (
          <AboutImageWrapper>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={layout.aboutImage} alt={layout.aboutTitle || "Sobre nós"} />
          </AboutImageWrapper>
        )}
      </AboutContainer>
    </AboutWrapper>
  );
}
