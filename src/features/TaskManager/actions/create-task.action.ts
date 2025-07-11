// src/features/TaskManager/actions/create-task.action.ts

'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
// 1. Importamos nosso schema do seu novo local
import { taskFormSchema } from '../schemas';
import { revalidatePath } from 'next/cache';
import { PostHog } from 'posthog-node';

const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY!,
  { host: process.env.NEXT_PUBLIC_POSTHOG_HOST! }
)

export async function createTask(values: z.infer<typeof taskFormSchema>) {
  const session = await getCurrentUserSession();
  const validatedFields = taskFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Dados inválidos.' };
  }

  const { title, description, priority, dueDate } = validatedFields.data;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate,
        userId: session.user.id,
      },
    });
    await prisma.activity.create({
      data: {
        userId: session.user.id,
        action: 'CREATE_TASK',
        entityId: newTask.id.toString(),
        entityType: 'TASK',
        details: `Criou a tarefa "${newTask.title}"`,
      },
    });

    await posthog.capture({
      distinctId: session.user.id, // O ID do usuário que realizou a ação
      event: 'task_created',       // O nome do nosso evento customizado
      properties: {                // Dados extras que queremos associar ao evento
        taskId: newTask.id,
        taskTitle: newTask.title,
        priority: newTask.priority,
      },
    });
    // Garantimos que o PostHog envie o evento antes de continuar
    await posthog.shutdown();
    revalidatePath('/tasks');
    return { success: 'Tarefa criada com sucesso!' };
  } catch (error) {
    return { error: 'Falha ao criar a tarefa.' };
  }
}