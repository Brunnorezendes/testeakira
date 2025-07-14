// src/features/Auth/actions/signIn.action.ts - Versão sem Zod

'use server';

import { PostHog } from 'posthog-node';
import { getCurrentUserSession } from '@/_shared/services/sessionService';

const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY!,
  { host: process.env.NEXT_PUBLIC_POSTHOG_HOST! }
);

export async function signIn() {
  try {
    const session = await getCurrentUserSession();
    await posthog.capture({
      distinctId: session.user.id,
      event: 'user_logged_in',
      properties: { method: 'email_password' },
    });
    await posthog.shutdown();
  } catch (error) {
    return { error: 'Ocorreu um erro inesperado. Tente novamente.' };
  }
}
