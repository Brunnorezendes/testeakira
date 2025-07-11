// src/Config/PostHogProvider.tsx

'use client'; // Este componente precisa rodar no cliente para interagir com a biblioteca do PostHog

import { useAuth } from '@/hooks/useAuth'; // Vamos criar este hook a seguir
import posthog from 'posthog-js';
import { PostHogProvider as PostHogProviderWrapper } from 'posthog-js/react';
import { ReactNode, useEffect } from 'react';

// Inicializamos o PostHog fora do componente
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
    capture_pageview: false, // Nós capturaremos as pageviews manualmente para ter mais controle
  });
}

// Este componente lida com a identificação do usuário
function PostHogAuthWrapper({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useAuth(); // Usando o hook para obter dados do usuário

  useEffect(() => {
    if (isLoaded && user) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
      });
    } else if (isLoaded && !user) {
      posthog.reset();
    }
  }, [user, isLoaded]);

  return <>{children}</>;
}

// Este é o nosso provedor principal que exportamos
export function PostHogProvider({ children }: { children: ReactNode }) {
  return (
    <PostHogProviderWrapper client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProviderWrapper>
  );
}