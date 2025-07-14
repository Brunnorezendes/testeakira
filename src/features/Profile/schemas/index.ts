// src/features/Profile/schemas/index.ts

import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
  image: z.string().optional(),
});