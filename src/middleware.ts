import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE, isValidAccessToken } from '@/lib/access';

const ACCESS_ROUTE = '/access';
const ACCESS_API_ROUTE = '/api/access';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === ACCESS_ROUTE || pathname === ACCESS_API_ROUTE) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  if (await isValidAccessToken(token)) {
    return NextResponse.next();
  }

  const accessUrl = request.nextUrl.clone();
  accessUrl.pathname = ACCESS_ROUTE;
  accessUrl.search = `?next=${encodeURIComponent(`${pathname}${search}`)}`;

  return NextResponse.redirect(accessUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|assets|favicon.ico).*)'],
};
