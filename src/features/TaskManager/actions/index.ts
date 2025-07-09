// src/features/TaskManager/actions/index.ts

'use server';

import { getCurrentUserSession } from '@/_shared/services/sessionService';
import prisma from '@/lib/prisma';

/**
 * Busca no banco de dados todas as tarefas associadas
 * ao usuário que está atualmente logado.
 * @returns Uma Promise que resolve para um array de tarefas.
 */
export async function getUserTasks() {
  // 1. Garante que o usuário está logado e obtém a sessão.
  const session = await getCurrentUserSession();

  // 2. Busca as tarefas no banco de dados.
  // Após rodar 'npx prisma generate', o TypeScript entenderá que
  // session.user.id (string) é compatível com Task.userId (string).
  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return tasks;
}