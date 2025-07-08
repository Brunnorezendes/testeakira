// src/_shared/services/session.service.ts

import 'server-only'; // Garante que este código só rode no servidor
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

/**
 * Esta função é nosso "guarda-costas".
 * Ela busca a sessão atual e, se não encontrar, redireciona para a página de login.
 * Se encontrar, ela retorna os dados da sessão.
 */
export async function getCurrentUserSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  return session;
}