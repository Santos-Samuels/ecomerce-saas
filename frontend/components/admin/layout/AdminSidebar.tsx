"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FiBox,
  FiHome,
  FiSettings,
  FiShoppingBag,
  FiUsers,
  FiChevronDown,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AdminMenuItem } from "@/store/adminMenu/adminMenuSlice";
import * as S from "./styles";
import { logout } from "@/store/auth/authSlice";

function getMenuIcon(id: string) {
  if (id === "overview") return <FiHome size={16} />;
  if (id === "products") return <FiBox size={16} />;
  if (id === "orders") return <FiShoppingBag size={16} />;
  if (id === "customers") return <FiUsers size={16} />;
  if (id === "settings") return <FiSettings size={16} />;
  return null;
}

export function AdminSidebar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.adminMenu);
  const storeImageUrl = useAppSelector(
    (state) => state.storeSettings.store?.logoUrl ?? null
  );
   const storeName = useAppSelector(
    (state) => state.storeSettings.store?.name ?? null
  );

  const router = useRouter();
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  if (!user) return null;

  const storeInitial =
    (storeName ?? user.name ?? "")
      .trim()
      .charAt(0)
      .toUpperCase() || "E";

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/admin/login");
  };

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isPathActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <S.Sidebar>
      <S.SidebarHeader>
        {storeImageUrl ? (
          <S.LogoImageWrapper>
            <Image
              src={storeImageUrl}
              alt={storeName ?? "Logo da loja"}
              fill
              sizes="32px"
              style={{ objectFit: "cover" }}
            />
          </S.LogoImageWrapper>
        ) : (
          <S.LogoMark>{storeInitial}</S.LogoMark>
        )}
        <S.SidebarTitle>
          <S.SidebarTitleMain>Portal Admin</S.SidebarTitleMain>
          <S.SidebarTitleSub>Gestão da loja</S.SidebarTitleSub>
        </S.SidebarTitle>
      </S.SidebarHeader>

      <S.SidebarNav>
        {items.map((item: AdminMenuItem) => {
          const hasChildren = Boolean(
            item.children && item.children.length > 0
          );
          const childActive =
            item.children?.some((child) => isPathActive(child.path)) ?? false;
          const itemActive = isPathActive(item.path) || childActive;
          const isOpen = hasChildren
            ? (openGroups[item.id] ?? itemActive)
            : false;
          const icon = getMenuIcon(item.id);

          return (
            <div key={item.id}>
              <S.SidebarNavItem
                type="button"
                $active={itemActive}
                onClick={
                  hasChildren
                    ? () => toggleGroup(item.id)
                    : () => handleNavigate(item.path)
                }
              >
                <S.SidebarNavItemLabel>
                  {icon && <S.NavIcon>{icon}</S.NavIcon>}
                  <span>{item.label}</span>
                </S.SidebarNavItemLabel>
                {hasChildren && (
                  <S.ChevronIcon data-open={isOpen}>
                    <FiChevronDown size={14} />
                  </S.ChevronIcon>
                )}
              </S.SidebarNavItem>

              {hasChildren && isOpen && (
                <S.SidebarSubNav>
                  {item.children?.map((child) => {
                    const childIsActive = isPathActive(child.path);
                    return (
                      <S.SidebarSubNavItem
                        key={child.id}
                        type="button"
                        $active={childIsActive}
                        onClick={() => handleNavigate(child.path)}
                      >
                        {child.label}
                      </S.SidebarSubNavItem>
                    );
                  })}
                </S.SidebarSubNav>
              )}
            </div>
          );
        })}
      </S.SidebarNav>

      <S.SidebarFooter>
        <S.UserInfo>
          <S.UserName>{user.name}</S.UserName>
          <S.UserRole>Admin</S.UserRole>
        </S.UserInfo>
        <S.LogoutButton type="button" onClick={handleLogout}>
          Sair
        </S.LogoutButton>
      </S.SidebarFooter>
    </S.Sidebar>
  );
}
