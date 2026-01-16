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
  gap: 4px;
  margin-top: 12px;
`;

export const SidebarNavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: inherit;
  font-size: 13px;
  cursor: pointer;
  transition:
    background 0.18s ease,
    transform 0.12s ease,
    box-shadow 0.18s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.7);
    box-shadow: 0 10px 18px rgba(15, 23, 42, 0.75);
    transform: translateY(-1px);
  }
`;

export const SidebarNavItemLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NavBullet = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #93c5fd;
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(148, 163, 184, 0.45);
  font-size: 12px;
  color: #9ca3af;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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

export const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const MainTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #0f172a;
`;

export const MainSubtitle = styled.p`
  margin-top: 4px;
  font-size: 13px;
  color: #64748b;
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
