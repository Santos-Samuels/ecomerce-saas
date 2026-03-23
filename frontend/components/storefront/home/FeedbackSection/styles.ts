import styled from "styled-components";

export const SectionWrapper = styled.section`
  padding: 80px 0;
  background-color: var(--mantine-color-gray-0);
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
  color: var(--mantine-color-dark-9);
`;

export const FeedbackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
`;

export const FeedbackCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const StarRating = styled.div`
  display: flex;
  gap: 4px;
  color: #fab005;
`;

export const Comment = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: var(--mantine-color-gray-7);
  flex: 1;
  font-style: italic;
`;

export const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  border-top: 1px solid var(--mantine-color-gray-2);
  padding-top: 16px;
`;

export const CustomerAvatar = styled.div<{ $bgColor?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ $bgColor }) => $bgColor ? `${$bgColor}15` : "var(--mantine-color-brand-6)"};
  color: ${({ $bgColor }) => $bgColor ?? "var(--mantine-color-white)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
`;

export const CustomerName = styled.span`
  font-weight: 600;
  color: var(--mantine-color-dark-9);
`;
