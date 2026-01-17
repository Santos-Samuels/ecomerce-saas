import styled from "styled-components";

export const AdminLayout = styled.div`
  min-height: 100vh;
  display: flex;
  background:
    radial-gradient(circle at top left, #e0f2fe, transparent 55%),
    radial-gradient(circle at bottom right, #e5e7eb, transparent 55%),
    var(--mantine-color-gray-0);
`;

export const Sidebar = styled.aside`
  width: 260px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: linear-gradient(
    145deg,
    rgba(15, 23, 42, 0.96),
    rgba(30, 64, 175, 0.9)
  );
  color: #e5e7eb;
  box-shadow:
    0 20px 45px rgba(15, 23, 42, 0.8),
    0 0 0 1px rgba(148, 163, 184, 0.2);
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LogoMark = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #bfdbfe, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: #0b1120;
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
  color: #9ca3af;
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
  color: ${({ $active }) => ($active ? "#e5e7eb" : "inherit")};
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
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.75);
  color: #bfdbfe;
`;

export const NavBullet = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #93c5fd;
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
  color: ${({ $active }) => ($active ? "#e5e7eb" : "#cbd5f5")};
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    transform 0.12s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.8);
    color: #e5e7eb;
    transform: translateY(-0.5px);
  }
`;

export const ChevronIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
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
  color: #9ca3af;
  display: flex;
  flex-direction: column;
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
  color: #e5e7eb;
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
    background: rgba(30, 64, 175, 0.85);
    border-color: rgba(191, 219, 254, 0.9);
    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.8);
    transform: translateY(-0.5px);
  }
`;

export const UserName = styled.span`
  font-weight: 500;
  color: #e5e7eb;
`;

export const UserRole = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9ca3af;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 28px 32px;
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
  color: #0f172a;
  margin-bottom: 6px;
`;

export const PlaceholderText = styled.p`
  font-size: 13px;
  color: #64748b;
`;
