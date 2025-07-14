// src/middleware.ts - VERSÃO FINAL E CORRETA
import { auth } from '@/lib/auth';

export default auth;

export const config = {
  matcher: [
    '/tasks/:path*',
    '/profile/:path*',
  ],
};