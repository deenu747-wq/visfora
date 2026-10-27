import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === "true";
  const isAdmin = request.cookies.get("admin_bypass")?.value === "true";
  const isComingSoonPage = request.nextUrl.pathname.startsWith("/coming-soon");
  const isAdminBypassPage = request.nextUrl.pathname.startsWith("/admin-bypass");

  if (isMaintenance && !isAdmin && !isComingSoonPage && !isAdminBypassPage) {
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};