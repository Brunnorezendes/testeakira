// src/features/Profile/components/ProfileInfoCard.tsx

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { User } from '@prisma/client'; // Importamos o tipo User

// A interface de props agora espera um objeto 'user'
interface ProfileInfoCardProps {
  user: {
    name: string | null;
    email: string | null;
    createdAt: Date;
  };
}

export function ProfileInfoCard({ user }: ProfileInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Membro desde {format(new Date(user.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </p>
      </CardContent>
    </Card>
  );
}