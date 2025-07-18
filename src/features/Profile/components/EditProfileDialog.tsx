// src/features/Profile/components/EditProfileDialog.tsx

'use client';

import { useState } from 'react';
import { User } from '@prisma/client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserProfileForm } from './UserProfileForm';

export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null; // A propriedade image é opcional, aceitando undefined.
  createdAt: Date;
};

interface EditProfileDialogProps {
  user: SessionUser;
}

export function EditProfileDialog({ user }: EditProfileDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar Perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <UserProfileForm user={user} onFormSubmit={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}