// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// O nome do cookie que o better-auth usa por padrão
const sessionCookieName = 'testeakira-session';

export function middleware(request: NextRequest) {
  // 1. Pega o cookie da sessão
  const sessionCookie = request.cookies.get(sessionCookieName);

  // 2. Se o cookie NÃO existir, redireciona para a página de login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Se o cookie existir, permite o acesso
  return NextResponse.next();
}

// 4. A configuração que diz onde o middleware deve rodar
export const config = {
  matcher: ['/tasks/:path*'],
};