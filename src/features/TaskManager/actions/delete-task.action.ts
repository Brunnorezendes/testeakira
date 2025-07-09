// src/features/TaskManager/actions/delete-task.action.ts

'use server';

import prisma from '@/lib/prisma';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { revalidatePath } from 'next/cache';

export async function deleteTask(taskId: number) {
  const session = await getCurrentUserSession();

  try {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: session.user.id,
      },
    });

    if (!task) {
      return { error: 'Tarefa não encontrada ou você não tem permissão para excluí-la.' };
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    revalidatePath('/tasks');
    return { success: 'Tarefa excluída com sucesso!' };

  } catch (error) {
    return { error: 'Falha ao excluir a tarefa.' };
  }
}