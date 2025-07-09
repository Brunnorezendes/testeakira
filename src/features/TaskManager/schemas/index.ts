// src/features/TaskManager/schemas/index.ts

import { z } from 'zod';
import { TaskStatus, TaskPriority } from '@prisma/client';

// Criamos um único schema que serve para criar E editar.
// Campos que só existem na edição, como 'id' e 'status', são opcionais.
export const taskFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, { message: 'O título deve ter pelo menos 3 caracteres.' }),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z.date().optional().nullable(),
});