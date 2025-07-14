// src/features/Profile/actions/get-user-activity.action.ts

'use server';

import prisma from '@/lib/prisma';
import { getCurrentUserSession } from '@/_shared/services/sessionService';

export async function getUserActivity() {
  const session = await getCurrentUserSession();

  const activities = await prisma.activity.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });

  return activities;
}
