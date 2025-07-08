import { Metadata } from 'next';
// 1. Importamos nosso novo serviço de sessão compartilhado
import { getCurrentUserSession } from '@/_shared/services/sessionService';

export const metadata: Metadata = {
  title: 'Minhas Tarefas',
};

export default async function TasksPage() {
  // 2. Chamamos nosso "guarda-costas" com uma única linha.
  // Se o usuário não estiver logado, esta função NUNCA retornará.
  // Ela interromperá a execução e redirecionará.
  const session = await getCurrentUserSession();

  // 3. Se o código continuar, temos 100% de certeza que a sessão é válida.
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Bem-vindo, {session.user?.name}!</h1>
      <p className="mt-2">Esta é sua área de gerenciamento de tarefas.</p>
    </div>
  );
}