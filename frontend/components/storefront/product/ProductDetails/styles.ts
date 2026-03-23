import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 500px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #212529;
  margin: 0;
  line-height: 1.2;
`;

export const Category = styled.span`
  font-size: 0.875rem;
  color: #868e96;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

export const Price = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #2b8a3e;
`;

export const OldPrice = styled.span`
  font-size: 1.25rem;
  color: #868e96;
  text-decoration: line-through;
`;

export const Description = styled.div`
  font-size: 1rem;
  color: #495057;
  line-height: 1.6;
`;

export const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 0.5rem;
`;

export const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const ThumbnailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const ThumbnailItem = styled.div<{ active?: boolean }>`
  border: 2px solid ${({ active }) => (active ? 'var(--mantine-color-brand-1)' : '#dee2e6')};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
  transition: all 0.2s ease;
  opacity: ${({ active }) => (active ? 1 : 0.7)};

  &:hover {
    border-color: var(--mantine-color-green-1);
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SpecsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
  }

  th {
    width: 40%;
    color: #868e96;
    font-weight: 600;
  }

  td {
    color: #495057;
  }
`;

export const VehicleList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #495057;
    
    &::before {
      content: "•";
      color: var(--mantine-color-brand-1);
      font-weight: bold;
    }
  }
`;