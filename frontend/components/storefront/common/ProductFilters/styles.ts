import styled from "styled-components";

export const FiltersWrapper = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FilterTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: var(--mantine-color-dark-9);
  margin: 0;
`;

export const MobileFilterButton = styled.button`
  display: none;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: 8px;
  font-weight: 500;
  color: var(--mantine-color-dark-9);
  cursor: pointer;
  width: 100%;
  justify-content: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
  }
`;
