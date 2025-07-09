// src/features/TaskManager/schemas/index.ts
import { z } from 'zod';
import { TaskPriority } from '@prisma/client';

export const taskSchema = z.object({
  title: z.string().min(3, { message: 'O título deve ter pelo menos 3 caracteres.' }),
  description: z.string().optional(),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z.date().optional(), // Garanta que esta linha exista
});