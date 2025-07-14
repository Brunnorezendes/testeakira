// src/features/Profile/components/RecentActivityCard.tsx

'use client';

import { Activity } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { History } from 'lucide-react';

interface RecentActivityCardProps {
  activities: Activity[];
}

export function RecentActivityCard({ activities }: RecentActivityCardProps) {
  const formatActionText = (action: string, details: string | null) => {
    const detailsText = details ? `"${details}"` : '';

    switch (action) {
      case 'CREATE_TASK':
        return `Você criou a tarefa: ${detailsText}`;
      case 'UPDATE_TASK':
        return `Você atualizou a tarefa: ${detailsText}`;
      case 'DELETE_TASK':
        return `Você excluiu a tarefa: ${detailsText}`;
      case 'UPDATE_TASK_STATUS':
        return details;
      default:
        return 'Atividade desconhecida.';
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-6 w-6" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm">
                    {formatActionText(activity.action, activity.details)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Nenhuma atividade recente encontrada.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
