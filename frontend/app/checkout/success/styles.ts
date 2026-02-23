import styled from "styled-components";

export const PageWrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 20px 40px;
`;

export const Hero = styled.div`
  background: white;
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`;

export const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: var(--mantine-color-dark-9);
`;

export const HeroSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--mantine-color-dimmed);
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;
