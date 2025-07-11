// src/features/Auth/actions/signOut.action.ts - VERSÃO FINAL E VERIFICADA

'use server';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { PostHog } from 'posthog-node';
import { getCurrentUserSession } from '@/_shared/services/sessionService';

const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY!,
  { host: process.env.NEXT_PUBLIC_POSTHOG_HOST! }
)

export async function signOut() {
  try {

    const session = await getCurrentUserSession();

    // 3. Se houver uma sessão, capturamos o evento de logout
    if (session?.user) {
      await posthog.capture({
        distinctId: session.user.id,
        event: 'user_logged_out',
      });
      await posthog.shutdown();
    }

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