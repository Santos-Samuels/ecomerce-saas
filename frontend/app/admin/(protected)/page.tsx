"use client";

import { useAppSelector } from "@/store/hooks";
import * as S from "./styles";

export default function AdminDashboardPage() {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  return (
    <S.AdminLayout>
      <S.Sidebar>
        <S.SidebarHeader>
          <S.LogoMark>EA</S.LogoMark>
          <S.SidebarTitle>
            <S.SidebarTitleMain>Portal Admin</S.SidebarTitleMain>
            <S.SidebarTitleSub>Gestão da loja</S.SidebarTitleSub>
          </S.SidebarTitle>
        </S.SidebarHeader>

        <S.SidebarNav>
          <S.SidebarNavItem type="button">
            <S.SidebarNavItemLabel>
              <S.NavBullet />
              <span>Visão geral</span>
            </S.SidebarNavItemLabel>
            <span>•</span>
          </S.SidebarNavItem>
          <S.SidebarNavItem type="button">
            <S.SidebarNavItemLabel>
              <S.NavBullet />
              <span>Pedidos</span>
            </S.SidebarNavItemLabel>
            <span>•</span>
          </S.SidebarNavItem>
          <S.SidebarNavItem type="button">
            <S.SidebarNavItemLabel>
              <S.NavBullet />
              <span>Produtos</span>
            </S.SidebarNavItemLabel>
            <span>•</span>
          </S.SidebarNavItem>
          <S.SidebarNavItem type="button">
            <S.SidebarNavItemLabel>
              <S.NavBullet />
              <span>Clientes</span>
            </S.SidebarNavItemLabel>
            <span>•</span>
          </S.SidebarNavItem>
          <S.SidebarNavItem type="button">
            <S.SidebarNavItemLabel>
              <S.NavBullet />
              <span>Configurações</span>
            </S.SidebarNavItemLabel>
            <span>•</span>
          </S.SidebarNavItem>
        </S.SidebarNav>

        <S.SidebarFooter>
          <S.UserInfo>
            <S.UserName>{user.name}</S.UserName>
            <S.UserRole>Admin</S.UserRole>
          </S.UserInfo>
        </S.SidebarFooter>
      </S.Sidebar>

      <S.MainContent>
        <S.MainHeader>
          <div>
            <S.MainTitle>Bem-vindo ao painel administrativo</S.MainTitle>
            <S.MainSubtitle>
              Em breve você verá os principais indicadores da sua loja aqui.
            </S.MainSubtitle>
          </div>
        </S.MainHeader>

        <S.PlaceholderCard>
          <S.PlaceholderTitle>Conteúdo em construção</S.PlaceholderTitle>
          <S.PlaceholderText>
            Esta área será utilizada para exibir dashboards, métricas de vendas,
            pedidos recentes e atalhos para as principais ações do dia a dia.
          </S.PlaceholderText>
        </S.PlaceholderCard>
      </S.MainContent>
    </S.AdminLayout>
  );
}
