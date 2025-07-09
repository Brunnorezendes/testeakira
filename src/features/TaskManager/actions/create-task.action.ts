// src/features/TaskManager/actions/create-task.action.ts

'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
// 1. Importamos nosso schema do seu novo local
import { taskSchema } from '../schemas';

export async function createTask(values: z.infer<typeof taskSchema>) {
  const session = await getCurrentUserSession();
  const validatedFields = taskSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Dados inválidos.' };
  }

  const { title, description, priority, dueDate } = validatedFields.data;

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate,
        userId: session.user.id,
      },
    });
    return { success: 'Tarefa criada com sucesso!' };
  } catch (error) {
    return { error: 'Falha ao criar a tarefa.' };
  }
}