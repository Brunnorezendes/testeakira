// src/features/Profile/actions/get-user-activity.action.ts

'use server';

import prisma from '@/lib/prisma';
import { getCurrentUserSession } from '@/_shared/services/sessionService';

/**
 * Busca no banco de dados todas as atividades associadas
 * ao usuário que está atualmente logado.
 * @returns Uma Promise que resolve para um array de atividades.
 */
export async function getUserActivity() {
  const session = await getCurrentUserSession();

  const activities = await prisma.activity.findMany({
    where: {
      userId: session.user.id,
    },
    // Ordenamos para mostrar as atividades mais recentes primeiro
    orderBy: {
      createdAt: 'desc',
    },
    // Limitamos a um número razoável de atividades para não sobrecarregar a página
    take: 20,
  });

  return activities;
}