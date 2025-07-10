// src/app/profile/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { EditProfileDialog } from '@/features/Profile/components/EditProfileDialog';

export const metadata: Metadata = {
  title: 'Meu Perfil',
};

export default async function ProfilePage() {
  const session = await getCurrentUserSession();

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            {/* O Avatar agora é exibido aqui */}
            {session.user.image ? (
              <Image 
                src={session.user.image} 
                alt="Avatar do usuário" 
                width={64} 
                height={64}
                className="rounded-full"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
            )}
            {session.user.name}
          </CardTitle>
          <CardDescription>
            {session.user.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium">Membro desde</p>
          <p className="text-muted-foreground">
            {format(new Date(session.user.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </CardContent>
        <CardFooter>
          <EditProfileDialog user={session.user} />
        </CardFooter>
      </Card>
    </div>
  );
}