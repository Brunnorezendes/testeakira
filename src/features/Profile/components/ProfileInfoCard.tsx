// src/features/Profile/components/ProfileInfoCard.tsx

'use client';

import { User } from '@prisma/client'; // Usamos o tipo User do Prisma
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { EditProfileDialog } from './EditProfileDialog'; // Importaremos o diálogo de edição

// A interface de props define que este componente precisa de um objeto 'user'
interface ProfileInfoCardProps {
  user: User;
}

export function ProfileInfoCard({ user }: ProfileInfoCardProps) {
  // Função auxiliar para pegar as iniciais do nome
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          {/* Lógica para exibir a imagem ou o fallback */}
          {user.image ? (
            <Image 
              src={user.image} 
              alt="Avatar do usuário" 
              width={64} 
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
              {getInitials(user.name)}
            </div>
          )}
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Membro desde {format(new Date(user.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </p>
      </CardContent>
      <CardFooter>
        {/* O botão para editar o perfil agora vive aqui dentro */}
        <EditProfileDialog user={user} />
      </CardFooter>
    </Card>
  );
}