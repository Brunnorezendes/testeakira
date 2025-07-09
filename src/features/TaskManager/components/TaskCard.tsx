// src/features/TaskManager/components/TaskCard.tsx

'use client';

import { Task } from '@prisma/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  // Função auxiliar para definir a cor do badge de prioridade
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'ALTA':
        return 'destructive'; // Vermelho
      case 'MEDIA':
        return 'default'; // Cinza/Azul padrão
      case 'BAIXA':
        return 'secondary'; // Um cinza mais claro
      default:
        return 'outline';
    }
  };

  // Função para formatar o status para exibição
  const formatStatus = (status: string) => {
    return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          {/* Título e Descrição */}
          <div className="flex-1">
            <CardTitle className="text-lg">{task.title}</CardTitle>
            {task.description && (
              <CardDescription className="mt-1">
                {task.description}
              </CardDescription>
            )}
          </div>
          {/* Badge de Prioridade */}
          <Badge variant={getPriorityVariant(task.priority)}>
            {task.priority}
          </Badge>
        </div>
        <div className="flex items-center pt-4 gap-4 text-xs text-muted-foreground">
          {/* Badge de Status */}
          <Badge variant="outline">{formatStatus(task.status)}</Badge>
          
          {/* Data de Vencimento (só aparece se existir) */}
          {task.dueDate && (
            <span>
              Vence em: {format(new Date(task.dueDate), "dd 'de' MMM", { locale: ptBR })}
            </span>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}