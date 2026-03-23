import styled from "styled-components";

export const AdminLayout = styled.div`
  min-height: 100vh;
  display: flex;
  background:
    radial-gradient(
      circle at top left,
      var(--mantine-color-brand-1),
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

export const PlaceholderCard = styled.section`
  border-radius: 18px;
  padding: 20px 18px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow:
    0 16px 35px rgba(15, 23, 42, 0.12),
    0 0 0 1px rgba(148, 163, 184, 0.18);
  max-width: 520px;
`;

export const PlaceholderTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: var(--mantine-color-gray-9);
  margin-bottom: 6px;
`;

export const PlaceholderText = styled.p`
  font-size: 13px;
  color: var(--mantine-color-gray-6);
`;
