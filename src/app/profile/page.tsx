// src/app/profile/page.tsx - Versão Refatorada

import { Metadata } from 'next';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { getUserTasks } from '@/features/TaskManager/actions';

// Importamos nossos novos componentes especialistas
import { ProfileInfoCard } from '@/features/Profile/components/ProfileInfoCard';
import { RecentActivityCard } from '@/features/Profile/components/RecentActivityCard';

export const metadata: Metadata = {
  title: 'Meu Perfil',
};

export default async function ProfilePage() {
  // 1. O "guarda-costas" é a primeira coisa a ser chamada.
  // Se o usuário não estiver logado, o código para aqui e redireciona.
  const session = await getCurrentUserSession();
  
  // 2. Se o código continuar, buscamos os outros dados.
  const tasks = await getUserTasks();

  // 3. A página apenas orquestra os componentes.
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ProfileInfoCard user={session.user} />
        </div>
        <div className="md:col-span-2">
          <RecentActivityCard tasks={tasks} />
        </div>
      </div>
    </div>
  );
}