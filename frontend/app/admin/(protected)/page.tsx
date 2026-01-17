"use client";

import { useAppSelector } from "@/store/hooks";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import * as S from "./styles";

export default function AdminDashboardPage() {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  return (
    <S.AdminLayout>
      <AdminSidebar />

      <S.MainContent>
        <AdminPageHeader
          title="Bem-vindo ao painel administrativo"
          subtitle="Em breve você verá os principais indicadores da sua loja aqui."
        />

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
