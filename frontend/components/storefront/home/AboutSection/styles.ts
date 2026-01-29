import styled from "styled-components";

export const AboutWrapper = styled.section`
  padding: 80px 0;
  background-color: white;
`;

export const AboutContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AboutTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: var(--mantine-color-dark-9);
  line-height: 1.2;
`;

export const AboutDescription = styled.p`
  font-size: 18px;
  color: var(--mantine-color-gray-7);
  line-height: 1.6;
`;

export const AboutImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;
