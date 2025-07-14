// src/app/profile/page.tsx - Versão Final

import { Metadata } from 'next';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { getUserActivity } from '@/features/Profile/actions/get-user-activity.action';

import { ProfileInfoCard } from '@/features/Profile/components/ProfileInfoCard';
import { RecentActivityCard } from '@/features/Profile/components/RecentActivityCard';

export const metadata: Metadata = {
  title: 'Meu Perfil',
};

export default async function ProfilePage() {
  const session = await getCurrentUserSession();
  const activities = await getUserActivity();

  return (
    <div className="p-4 md:p-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ProfileInfoCard user={session.user} />
        </div>
        <div className="md:col-span-2">
          <RecentActivityCard activities={activities} />
        </div>
      </div>
    </div>
  );
}