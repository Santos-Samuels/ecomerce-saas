"use client";

import { logout } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut, FiPackage, FiShield, FiUser, FiUsers } from "react-icons/fi";
import * as S from "./styles";

export function StaffSidebar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const pathname = usePathname();

  if (!user) return null;

  const isPathActive = (path: string) => pathname.startsWith(path);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/staff/logout");
  };

  const brandInitial =
    (user.name ?? user.email ?? "S").trim().charAt(0).toUpperCase() || "S";

  return (
    <S.Sidebar>
      <S.SidebarHeader>
        <S.Brand>{brandInitial}</S.Brand>
        <S.Title>Portal Staff</S.Title>
      </S.SidebarHeader>

      <S.SidebarNav>
        <S.SidebarNavItem
          type="button"
          $active={isPathActive("/staff/stores")}
          onClick={() => handleNavigate("/staff/stores")}
        >
          <S.SidebarNavItemLabel>
            <S.NavIcon>
              <FiPackage size={16} />
            </S.NavIcon>
            Lojas
          </S.SidebarNavItemLabel>
        </S.SidebarNavItem>

        <S.SidebarNavItem
          type="button"
          $active={isPathActive("/staff/permissions")}
          onClick={() => handleNavigate("/staff/permissions")}
        >
          <S.SidebarNavItemLabel>
            <S.NavIcon>
              <FiShield size={16} />
            </S.NavIcon>
            Permissões da loja
          </S.SidebarNavItemLabel>
        </S.SidebarNavItem>

        <S.SidebarNavItem
          type="button"
          $active={isPathActive("/staff/roles")}
          onClick={() => handleNavigate("/staff/roles")}
        >
          <S.SidebarNavItemLabel>
            <S.NavIcon>
              <FiShield size={16} />
            </S.NavIcon>
            Cargos
          </S.SidebarNavItemLabel>
        </S.SidebarNavItem>

        <S.SidebarNavItem
          type="button"
          $active={isPathActive("/staff/users")}
          onClick={() => handleNavigate("/staff/users")}
        >
          <S.SidebarNavItemLabel>
            <S.NavIcon>
              <FiUser size={16} />
            </S.NavIcon>
            Usuários
          </S.SidebarNavItemLabel>
        </S.SidebarNavItem>
      </S.SidebarNav>

      <S.SidebarFooter>
        <S.UserInfo>
          <S.UserName>{user.name}</S.UserName>
          <S.UserRole>Staff</S.UserRole>
        </S.UserInfo>
        <S.LogoutButton type="button" onClick={handleLogout}>
          <FiLogOut size={14} />
          Sair
        </S.LogoutButton>
      </S.SidebarFooter>
    </S.Sidebar>
  );
}
