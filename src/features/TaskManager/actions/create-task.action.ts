// src/features/TaskManager/actions/create-task.action.ts

'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
// 1. Importamos nosso schema do seu novo local
import { taskFormSchema } from '../schemas';

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
    return { success: 'Tarefa criada com sucesso!' };
  } catch (error) {
    return { error: 'Falha ao criar a tarefa.' };
  }
}