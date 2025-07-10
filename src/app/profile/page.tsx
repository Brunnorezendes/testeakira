// src/app/profile/page.tsx

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
  // O "Chef" busca os "ingredientes"
  const session = await getCurrentUserSession();
  const tasks = await getUserTasks();

  // O "Chef" apenas orquestra e monta o prato final
  return (
    <div className="grid md:grid-cols-3 gap-8 p-4 md:p-8">
      <div className="md:col-span-1">
        <ProfileInfoCard user={session.user} />
      </div>
      <div className="md:col-span-2">
        <RecentActivityCard tasks={tasks} />
      </div>
    </div>
  );
}