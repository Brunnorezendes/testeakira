// src/features/TaskManager/actions/update-task.action.ts

'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { revalidatePath } from 'next/cache';
// Importamos o schema do seu local correto
import { taskFormSchema } from '../schemas';

export async function updateTask(values: z.infer<typeof taskFormSchema>) {
  const session = await getCurrentUserSession();
  const validatedFields = taskFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Dados inválidos.' };
  }

  const { id, ...dataToUpdate } = validatedFields.data;

  if (typeof id === 'undefined' || id === null) {
    return { error: 'ID da tarefa não fornecido.' };
  }

  try {
    const task = await prisma.task.findFirst({
      where: { id: id, userId: session.user.id },
    });

    if (!task) {
      return { error: 'Tarefa não encontrada ou você não tem permissão para editá-la.' };
    }
    
    await prisma.task.update({
      where: { id: id },
      data: dataToUpdate,
    });

    await prisma.activity.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE_TASK',
        entityId: id.toString(),
        entityType: 'TASK',
        details: `Atualizou a tarefa "${dataToUpdate.title}"`,
      },
    });
    
    revalidatePath('/tasks');
    return { success: 'Tarefa atualizada com sucesso!' };

  } catch (error) {
    return { error: 'Falha ao atualizar a tarefa.' };
  }
}