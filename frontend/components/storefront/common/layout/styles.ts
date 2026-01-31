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
