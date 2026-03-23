import styled from "styled-components";

export const StaffLayout = styled.div`
  min-height: 100vh;
  display: flex;
  background:
    radial-gradient(
      circle at top left,
      var(--mantine-color-green-1),
      transparent 55%
    ),
    radial-gradient(
      circle at bottom right,
      var(--mantine-color-gray-2),
      transparent 55%
    ),
    var(--mantine-color-gray-0);
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 28px 32px;
  margin-left: 260px;
  min-height: 100vh;
  overflow-y: auto;
`;

