// src/features/TaskManager/schemas/index.ts

import { z } from 'zod';
import { TaskStatus, TaskPriority } from '@prisma/client';

// Este arquivo agora é o único responsável por definir a "forma" de uma tarefa.
export const taskSchema = z.object({
  title: z.string().min(3, { message: 'O título deve ter pelo menos 3 caracteres.' }),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z.date().optional(),
});