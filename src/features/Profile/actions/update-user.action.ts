// src/features/Profile/actions/update-user.action.ts

'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { revalidatePath } from 'next/cache';
import { updateUserSchema } from '../schemas';

export async function updateUser(values: z.infer<typeof updateUserSchema>) {
  const session = await getCurrentUserSession();
  const validatedFields = updateUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Dados inválidos.' };
  }

  const { name, image } = validatedFields.data;

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name,
        image: image,
      },
    });

    revalidatePath('/profile');
    revalidatePath('/tasks');

    return { success: 'Perfil atualizado com sucesso!' };

  } catch (error) {
    return { error: 'Falha ao atualizar o perfil.' };
  }
}