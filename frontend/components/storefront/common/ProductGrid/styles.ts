import styled from "styled-components";

export const EmptyStateWrapper = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #868e96;
`;

export const CardWrapper = styled.div`
  .mantine-Card-root {
    transition: all 0.2s ease;
    border: 1px solid transparent;
    cursor: pointer;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    background-color: #fff;
    
    &:hover {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      border-color: #eee;
    }
  }
`;

export const ProductImageWrapper = styled.div`
  position: relative;
  height: 200px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-bottom: 1px solid #f1f1f1;
`;

export const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff4d4f;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  z-index: 1;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
`;

export const CurrentPrice = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: #333;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

export const OldPrice = styled.div`
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
  margin-bottom: 2px;
`;

export const FreeShipping = styled.div`
  color: #00a650;
  font-size: 13px;
  font-weight: 600;
  margin-top: 4px;
`;

export const ProductTitle = styled.h3`
  font-size: 14px;
  font-weight: 400;
  color: #333;
  margin: 0;
  line-height: 1.3;
  height: 36px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

