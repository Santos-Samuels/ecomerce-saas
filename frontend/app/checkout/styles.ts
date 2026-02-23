import styled from "styled-components";

export const PageWrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 20px 40px;
`;

export const Header = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const HeaderSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--mantine-color-dimmed);
`;

export const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.2fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Section = styled.div`
  background: white;
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: 12px;
  padding: 20px 20px 16px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 700;
  color: var(--mantine-color-dark-9);
`;

export const SummaryFooter = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 16px;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--mantine-color-gray-3);

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const ItemTitle = styled.div`
  font-weight: 600;
  color: var(--mantine-color-dark-9);
  line-height: 1.2;
  word-break: break-word;
  font-size: 14px;
`;

export const ItemMeta = styled.div`
  font-size: 12px;
  color: var(--mantine-color-dimmed);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ColorDot = styled.span<{ $hex?: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${({ $hex }) => $hex || "#e9ecef"};
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

export const ItemRight = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 120px;
`;

export const ItemSub = styled.div`
  font-size: 12px;
  color: var(--mantine-color-dimmed);
`;

export const ItemTotal = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: var(--mantine-color-dark-9);
`;
