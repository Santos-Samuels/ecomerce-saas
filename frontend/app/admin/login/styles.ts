import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(circle at top left, #e0f2fe, transparent 55%),
    radial-gradient(circle at bottom right, #e5e7eb, transparent 55%),
    var(--mantine-color-gray-0);
`;
