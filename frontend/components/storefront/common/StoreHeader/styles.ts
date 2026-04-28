import styled from "styled-components";

export const HeaderWrapper = styled.header<{ $primaryColor?: string | null }>`
  background-color: ${({ $primaryColor }) =>
    $primaryColor || "var(--mantine-color-white)"};
  color: ${({ $primaryColor }) =>
    $primaryColor ? "var(--mantine-color-white)" : "var(--mantine-color-dark-9)"};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
`;

export const HeaderContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const LogoSection = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  min-width: 0;
  flex: 1;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const LogoImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  background-color: white;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FallbackLogo = styled.div`
  width: 48px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
`;

export const StoreName = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 32px;
  margin: 0 48px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 0;
  position: relative;
  opacity: 0.9;
  transition: opacity 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: currentColor;
    transition: width 0.2s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
`;

export const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

export const MobileMenuButton = styled(ActionButton)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileNavLinks = styled.nav<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    gap: 4px;
    padding: 0 20px 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);

    ${NavLink} {
      width: 100%;
      text-align: left;
      padding: 10px 0;
    }
  }
`;
