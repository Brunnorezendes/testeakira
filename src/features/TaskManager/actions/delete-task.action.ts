// src/features/TaskManager/actions/delete-task.action.ts

'use server';

import prisma from '@/lib/prisma';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { revalidatePath } from 'next/cache';
import { PostHog } from 'posthog-node';

const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY!,
  { host: process.env.NEXT_PUBLIC_POSTHOG_HOST! }
)

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

    await prisma.activity.create({
      data: {
        userId: session.user.id,
        action: 'DELETE_TASK',
        entityId: task.id.toString(),
        entityType: 'TASK',
        details: `Excluiu a tarefa "${task.title}"`,
      },
    });

    await posthog.capture({
      distinctId: session.user.id,
      event: 'task_deleted',
      properties: {
        taskId: task.id,
        taskTitle: task.title,
        priority: task.priority,
        status: task.status
      },
    });

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    revalidatePath('/tasks');
    revalidatePath('/profile');
    return { success: 'Tarefa excluída com sucesso!' };

  } catch (error) {
    return { error: 'Falha ao excluir a tarefa.' };
  }
}