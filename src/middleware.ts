// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const sessionCookieName = 'better-auth.session_token';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(sessionCookieName);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/tasks/:path*',
    '/profile/:path*',
  ],
};