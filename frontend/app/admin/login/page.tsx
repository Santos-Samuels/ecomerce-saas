import { DashboardLoginForm } from "@/components/auth/DashboardLoginForm";

export default function DashboardLoginPage() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--mantine-color-gray-0)",
      }}
    >
      <DashboardLoginForm />
    </div>
  );
}
