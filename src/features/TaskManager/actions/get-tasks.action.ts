// src/features/TaskManager/actions/get-tasks.action.ts

'use server';

import { getCurrentUserSession } from '@/_shared/services/sessionService';
import prisma from '@/lib/prisma';

export async function getUserTasks() {
  const session = await getCurrentUserSession();
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