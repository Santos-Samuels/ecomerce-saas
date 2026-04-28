import styled from "styled-components";

export const HeroWrapper = styled.div<{
  $backgroundImage?: string | null;
  $contentless?: boolean;
}>`
  position: relative;
  width: 100%;
  min-height: 500px;
  background-image: ${({ $backgroundImage }) =>
    $backgroundImage ? `url(${$backgroundImage})` : "none"};
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $backgroundImage }) =>
      $backgroundImage
        ? "none"
        : "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))"};
    z-index: 1;
  }

  @media (max-width: 768px) {
    min-height: ${({ $contentless }) =>
      $contentless ? "clamp(120px, 34vw, 180px)" : "300px"};
    padding: ${({ $contentless }) => ($contentless ? "8px 16px" : "40px 16px")};
    background-size: ${({ $contentless }) => ($contentless ? "contain" : "cover")};
    background-repeat: no-repeat;
    background-position: center top;
  }
`;

export const HeroContent = styled.div<{ $hasImage: boolean }>`
  position: relative;
  z-index: 2;
  max-width: 800px;
  color: ${({ $hasImage }) =>
    $hasImage ? "white" : "var(--mantine-color-dark-9)"};
`;

export const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 32px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
