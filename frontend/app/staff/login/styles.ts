import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(circle at top left, var(--mantine-color-green-1), transparent 55%),
    radial-gradient(circle at bottom right, var(--mantine-color-gray-2), transparent 55%),
    var(--mantine-color-gray-0);
`;

