"use client";

import { StaffSidebar } from "@/components/staff/layout/StaffSidebar";
import { AdminPageHeader } from "@/components/admin/layout/AdminPageHeader";
import * as S from "./styles";

export default function StaffDashboardPage() {
  return (
    <S.StaffLayout>
      <StaffSidebar />

      <S.MainContent>
        <AdminPageHeader
          title="Bem-vindo ao portal do Staff"
          subtitle="Acesse lojas, permissões e papéis de usuário."
        />

        <section
          style={{
            borderRadius: 18,
            padding: "20px 18px",
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow:
              "0 16px 35px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(148, 163, 184, 0.18)",
            maxWidth: 520,
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "var(--mantine-color-gray-9)",
              marginBottom: 6,
            }}
          >
            Conteúdo em construção
          </h2>
          <p style={{ fontSize: 13, color: "var(--mantine-color-gray-6)" }}>
            Em breve você verá atalhos e métricas úteis aqui. Use o menu à
            esquerda para navegar.
          </p>
        </section>
      </S.MainContent>
    </S.StaffLayout>
  );
}

