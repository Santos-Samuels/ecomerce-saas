import styled from "styled-components";

export const ScreenWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--mantine-color-gray-0);
`;

export const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 20px;
`;

export const WhatsAppFloatingButton = styled.a`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2000;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #25d366;
  color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  text-decoration: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    right: 16px;
    bottom: 16px;
    width: 52px;
    height: 52px;
  }
`;
