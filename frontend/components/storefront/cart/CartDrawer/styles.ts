import styled from "styled-components";

export const CartItemWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--mantine-color-gray-2);
`;

export const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  background-color: var(--mantine-color-gray-1);
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

export const ItemName = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--mantine-color-dark-9);
`;

export const ItemPrice = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: var(--mantine-color-dark-9);
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CartFooter = styled.div`
  padding-top: 20px;
  border-top: 1px solid var(--mantine-color-gray-3);
  margin-top: auto;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  span {
    font-size: 16px;
    font-weight: 600;
  }
  
  strong {
    font-size: 20px;
    font-weight: 700;
    color: var(--mantine-color-dark-9);
  }
`;
