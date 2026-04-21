import styled from "styled-components";

export const ContactWrapper = styled.div`
  padding: 60px 0;
  background-color: var(--mantine-color-gray-0);
  min-height: calc(100vh - 80px); /* Adjust based on header height */
`;

export const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--mantine-color-dark-9);
  text-align: center;
`;

export const PageSubtitle = styled.p`
  font-size: 16px;
  color: var(--mantine-color-gray-6);
  text-align: center;
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

export const FormCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const IconWrapper = styled.div<{ $color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ $color }) => $color ? `${$color}15` : 'var(--mantine-color-brand-0)'};
  color: ${({ $color }) => $color || 'var(--mantine-color-brand-6)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoLabel = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--mantine-color-dark-9);
`;

export const InfoValue = styled.p`
  font-size: 15px;
  margin: 0;
  color: var(--mantine-color-gray-6);
  line-height: 1.5;
`;

export const SocialGrid = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid var(--mantine-color-gray-2);
`;

export const StorefrontImageWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
  line-height: 0;
`;

export const MapEmbedWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  height: 0;
  padding-bottom: 56.25%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

export const LocationSection = styled.section`
  margin-top: 48px;
`;

export const LocationTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: var(--mantine-color-dark-9);
  text-align: center;
`;

export const LocationGrid = styled.div<{ $single: boolean }>`
  display: grid;
  gap: 24px;
  grid-template-columns: ${({ $single }) => ($single ? "1fr" : "1fr 1.2fr")};

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const LocationCard = styled.div`
  background: white;
  padding: 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const LocationMapCard = styled(LocationCard)`
  min-height: 280px;
`;
