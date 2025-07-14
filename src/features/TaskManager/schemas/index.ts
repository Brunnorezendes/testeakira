// src/features/TaskManager/schemas/index.ts

import { z } from 'zod';
import { TaskStatus, TaskPriority } from '@prisma/client';

export const taskFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, { message: 'O título deve ter pelo menos 3 caracteres.' }),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z.date().optional().nullable(),
});