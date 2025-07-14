// src/features/TaskManager/actions/update-task-status.action.ts

'use server';

import prisma from '@/lib/prisma';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { TaskStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { PostHog } from 'posthog-node';

const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY!,
  { host: process.env.NEXT_PUBLIC_POSTHOG_HOST! }
)

const updateStatusSchema = z.object({
  taskId: z.number(),
  status: z.nativeEnum(TaskStatus),
});

export async function updateTaskStatus(data: z.infer<typeof updateStatusSchema>) {
  const session = await getCurrentUserSession();
  
  const validatedData = updateStatusSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: 'Dados inválidos para atualizar o status.' };
  }

  const { taskId, status } = validatedData.data;

  try {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: session.user.id,
      },
    });

    if (!task) {
      return { error: 'Tarefa não encontrada ou sem permissão.' };
    }

    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: status,
      },
    });

    await prisma.activity.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE_TASK_STATUS',
        entityId: task.id.toString(),
        entityType: 'TASK',
        details: `Moveu a tarefa "${task.title}" para o status "${status.replace('_', ' ')}"`,
      },
    });

    await posthog.capture({
      distinctId: session.user.id,
      event: 'task_updated',
      properties: {
        taskId: task.id,
        taskTitle: task.title,
        priority: task.priority,
        status: task.status
      },
    });
    
    revalidatePath('/tasks');
    revalidatePath('/profile');
    return { success: `Status da tarefa atualizado para ${status}.` };

  } catch (error) {
    return { error: 'Falha ao atualizar o status da tarefa.' };
  }
}
