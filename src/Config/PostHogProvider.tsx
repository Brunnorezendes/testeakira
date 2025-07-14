// src/Config/PostHogProvider.tsx

'use client';

import { useAuth } from '@/hooks/useAuth';
import posthog from 'posthog-js';
import { PostHogProvider as PostHogProviderWrapper } from 'posthog-js/react';
import { ReactNode, useEffect } from 'react';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
    capture_pageview: false,
  });
}

function PostHogAuthWrapper({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useAuth();

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

export function PostHogProvider({ children }: { children: ReactNode }) {
  return (
    <PostHogProviderWrapper client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProviderWrapper>
  );
}
