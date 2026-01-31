import styled from "styled-components";
import { ThemeIcon } from "@mantine/core";

export const NotFoundPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const NotFoundIconWrapper = styled.div`
  margin-top: -90px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;

export const StyledThemeIcon = styled(ThemeIcon)`
  border: 8px solid white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const CopyrightText = styled.p`
  font-size: 14px;
  color: var(--mantine-color-dimmed);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  margin: 0;
`;
