// src/features/Auth/actions/signOut.action.ts - VERSÃO FINAL E VERIFICADA

'use server';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function signOut() {
  try {
    // 1. AWAIT AQUI: Resolvemos a promessa dos headers primeiro.
    const requestHeaders = await headers();

    // 2. Agora, passamos o objeto de headers já resolvido para a função signOut.
    await auth.api.signOut({
      headers: requestHeaders,
    });

  } catch (error) {
    console.error('Falha ao executar o signOut no servidor:', error);
  } finally {
    // 3. O redirecionamento acontece independentemente do resultado.
    redirect('/login');
  }
}