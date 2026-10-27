import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminBypass() {
  const cookieStore = await cookies();
  cookieStore.set("admin_bypass", "true", {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  redirect("/");
}