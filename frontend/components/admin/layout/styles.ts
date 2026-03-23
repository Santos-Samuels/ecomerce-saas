import { styled } from "styled-components";

export const Sidebar = styled.aside`
  width: 260px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: fixed;
  inset: 0 auto 0 0;
  background: linear-gradient(
    145deg,
    var(--mantine-color-dark-9),
    var(--mantine-color-brand-6)
  );
  color: var(--mantine-color-gray-2);
  box-shadow:
    0 20px 45px rgba(15, 23, 42, 0.8),
    0 0 0 1px rgba(148, 163, 184, 0.2);
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LogoImageWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.9);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.75);
`;

export const LogoMark = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: radial-gradient(
    circle at 30% 30%,
    var(--mantine-color-brand-3),
    var(--mantine-color-brand-6)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: white;
`;

export const SidebarTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 14px;
`;

export const SidebarTitleMain = styled.span`
  font-weight: 600;
`;

export const SidebarTitleSub = styled.span`
  font-size: 12px;
  color: var(--mantine-color-gray-5);
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
`;

export const SidebarNavItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 12px;
  border: none;
  background: ${({ $active }) =>
    $active ? "rgba(15, 23, 42, 0.9)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--mantine-color-gray-2)" : "inherit"};
  font-size: 13px;
  cursor: pointer;
  transition:
    background 0.18s ease,
    transform 0.12s ease,
    box-shadow 0.18s ease,
    color 0.18s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.8);
    box-shadow: 0 10px 18px rgba(15, 23, 42, 0.75);
    transform: translateY(-1px);
  }
`;

export const SidebarNavItemLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NavIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.75);
  color: #f2f2f2;
`;

export const NavBullet = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--mantine-color-brand-4);
`;

export const SidebarSubNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 4px;
  padding-left: 38px;
`;

export const SidebarSubNavItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  padding: 6px 8px;
  border-radius: 10px;
  border: none;
  background: ${({ $active }) =>
    $active ? "rgba(15, 23, 42, 0.95)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--mantine-color-gray-2)" : "var(--mantine-color-gray-4)"};
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    transform 0.12s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.8);
    color: var(--mantine-color-gray-2);
    transform: translateY(-0.5px);
  }
`;

export const ChevronIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mantine-color-gray-5);
  transition: transform 0.16s ease;

  &[data-open="true"] {
    transform: rotate(180deg);
  }
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(148, 163, 184, 0.45);
  font-size: 12px;
  color: var(--mantine-color-gray-5);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const LogoutButton = styled.button`
  align-self: flex-start;
  margin-top: 4px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background: rgba(15, 23, 42, 0.6);
  color: var(--mantine-color-gray-2);
  font-size: 11px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition:
    background 0.18s ease,
    transform 0.12s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    border-color: rgba(191, 219, 254, 0.9);
    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.8);
    transform: translateY(-0.5px);
  }
`;

export const UserName = styled.span`
  font-weight: 500;
  color: var(--mantine-color-gray-2);
`;

export const UserRole = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--mantine-color-gray-5);
`;
