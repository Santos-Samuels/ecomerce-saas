import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = await cookies();
  const hasToken = cookieStore.get("ecomerce-token");

  if (hasToken) {
    cookieStore.delete("ecomerce-token");
  }

  redirect("/admin/login");
}
