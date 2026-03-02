"use client";

import { AdminMenuItem } from "@/store/adminMenu/adminMenuSlice";
import { logout } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchStoreSettings } from "@/store/storeSettings/storeSettingsSlice";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  FiBox,
  FiChevronDown,
  FiHome,
  FiShoppingBag,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";
import * as S from "./styles";

function getMenuIcon(id: string) {
  if (id === "overview") return <FiHome size={16} />;
  if (id === "products") return <FiBox size={16} />;
  if (id === "orders") return <FiShoppingCart size={16} />;
  if (id === "customers") return <FiUsers size={16} />;
  if (id === "store") return <FiShoppingBag size={16} />;
  return null;
}

export function AdminSidebar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.adminMenu);
  const storeImageUrl = useAppSelector(
    (state) => state.storeSettings.store?.logoUrl ?? null,
  );
  const storeName = useAppSelector(
    (state) => state.storeSettings.store?.name ?? null,
  );
  const store = useAppSelector((state) => state.storeSettings.store);
  const storeLoading = useAppSelector((state) => state.storeSettings.loading);

  const router = useRouter();
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user?.storeId) return;
    if (store || storeLoading) return;
    dispatch(
      fetchStoreSettings({
        storeId: user.storeId,
      }),
    );
  }, [dispatch, store, storeLoading, user?.storeId]);

  const storePermissions = store?.permissions ?? null;

  const hasPermission = (
    required?: AdminMenuItem["requiredStorePermissions"],
  ) => {
    if (!required || required.length === 0) return true;
    if (!store) return true;
    if (!storePermissions || storePermissions.length === 0) return false;
    return required.some((perm) => storePermissions.includes(perm));
  };

  const filteredItems = useMemo(() => {
    return items
      .map((item) => {
        const filteredChildren = item.children?.filter((child) =>
          hasPermission(child.requiredStorePermissions),
        );

        const itemAllowed =
          hasPermission(item.requiredStorePermissions) ||
          (filteredChildren && filteredChildren.length > 0);

        if (!itemAllowed) {
          return null;
        }

        const newItem: AdminMenuItem = {
          ...item,
          children: filteredChildren,
        };

        return newItem;
      })
      .filter((item): item is AdminMenuItem => item !== null);
  }, [items, hasPermission]);

  const storeInitial =
    (storeName ?? user?.name ?? "").trim().charAt(0).toUpperCase() || "E";

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

  if (!user) return null;

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
        {filteredItems.map((item: AdminMenuItem) => {
          const hasChildren = Boolean(
            item.children && item.children.length > 0,
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
