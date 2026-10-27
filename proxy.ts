import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === 'true';
  const hasAdminCookie = request.cookies.get('visfora_admin');
  const isBypass = request.nextUrl.pathname.startsWith('/admin-bypass');
  const isComingSoon = request.nextUrl.pathname.startsWith('/coming-soon');

  if (isBypass || isComingSoon) {
    return NextResponse.next();
  }

  if (isMaintenance && !hasAdminCookie) {
    return NextResponse.rewrite(new URL('/coming-soon', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}