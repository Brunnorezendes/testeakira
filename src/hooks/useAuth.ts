// src/hooks/useAuth.ts

import { useStore } from '@nanostores/react'; // 1. Importamos o hook correto
import { authClient } from '@/lib/auth-client';

export const useAuth = () => {
  // 2. Usamos o useStore para ler o valor do átomo authClient.useSession
  const sessionState = useStore(authClient.useSession);
  
  // 3. Retornamos os dados em um formato consistente
  return {
    user: sessionState.data?.user ?? null,
    isLoaded: !sessionState.isPending, // isLoaded é verdadeiro quando não está mais pendente
    error: sessionState.error,
  };
};