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

  const aboutParagraphs =
    layout.aboutDescription
      ?.split(/\r?\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean) ?? [];

  return (
    <AboutWrapper>
      <AboutContainer>
        <AboutContent>
          {layout.aboutTitle && <AboutTitle>{layout.aboutTitle}</AboutTitle>}
          {aboutParagraphs.map((paragraph, index) => (
            <AboutDescription key={`${paragraph}-${index}`}>{paragraph}</AboutDescription>
          ))}
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
