import { auth } from '@/lib/auth'; // Importa nossa configuração principal
import { toNextJsHandler } from 'better-auth/next-js'; // Importa o "adaptador" para Next.js

// Esta linha mágica cria e exporta as rotas GET e POST
// que o better-auth precisa para funcionar.
export const { GET, POST } = toNextJsHandler(auth);