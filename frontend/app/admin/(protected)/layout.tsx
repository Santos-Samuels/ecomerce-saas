import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IUser, RoleById } from "@ecomerce/shared";

async function validateAuth(token: string): Promise<IUser | null> {
  const res = await fetch(`${process.env.API_BASE_URL}/auth/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("ecomerce-token")?.value;

  if (!token) {
    cookieStore.delete("ecomerce-token");
    redirect("/admin/login");
  }

  const session = await validateAuth(token);

  if (!session || session.role?.name !== RoleById.Admin) {
    cookieStore.delete("ecomerce-token");
    redirect("/admin/login");
  }

  return <>{children}</>;
}
