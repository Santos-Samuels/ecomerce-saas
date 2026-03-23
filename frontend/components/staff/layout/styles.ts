import styled from "styled-components";

export const Sidebar = styled.aside`
  position: fixed;
  inset: 0 auto 0 0;
  width: 260px;
  padding: 18px 16px;
  border-right: 1px solid rgba(148, 163, 184, 0.38);
  background: linear-gradient(
      180deg,
      rgba(241, 245, 249, 0.7),
      rgba(241, 245, 249, 0.4)
    ),
    rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.85);
  color: var(--mantine-color-gray-2);
  letter-spacing: 0.02em;
`;

export const Brand = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(
    135deg,
    var(--mantine-color-green-5),
    var(--mantine-color-green-7)
  );
  color: white;
  font-weight: 700;
  font-size: 14px;
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SidebarNavItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  border: none;
  background: ${({ $active }) =>
    $active ? "rgba(15, 23, 42, 0.95)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--mantine-color-gray-2)" : "var(--mantine-color-gray-8)"};
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

  &:focus-visible {
    outline: 2px solid var(--mantine-color-green-5);
    outline-offset: 2px;
  }
`;

export const NavIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  color: inherit;
`;

export const SidebarNavItemLabel = styled.span`
  flex: 1;
  font-size: 13px;
  letter-spacing: 0.01em;
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

export const UserName = styled.span`
  font-weight: 500;
  color: var(--mantine-color-gray-9);
`;

export const UserRole = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--mantine-color-gray-6);
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
