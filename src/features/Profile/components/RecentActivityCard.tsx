// src/features/Profile/components/RecentActivityCard.tsx

'use client';

import { Task } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface RecentActivityCardProps {
  tasks: Task[];
}

export function RecentActivityCard({ tasks }: RecentActivityCardProps) {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Atividade Recente</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            {tasks.length > 0 ? (
              tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Criada em {format(new Date(task.createdAt), "dd/MM/yyyy")}
                    </p>
                  </div>
                  <Badge variant="outline">{task.status.replace('_', ' ')}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma atividade de tarefas encontrada.</p>
            )}
          </CardContent>
        </Card>
    </div>
  );
}