// src/features/TaskManager/components/TaskCard.tsx - Versão Arrastável

'use client';

import { useDraggable } from '@dnd-kit/core';
import { Task, TaskStatus } from '@prisma/client';
import { format, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertCircle } from 'lucide-react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onClick: () => void; 
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== TaskStatus.CONCLUIDO;

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'ALTA': return 'destructive';
      case 'MEDIA': return 'default';
      case 'BAIXA': return 'secondary';
      default: return 'outline';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className="text-left w-full cursor-grab"
    >
      <Card className={cn("hover:border-primary", isOverdue && "border-destructive")}>
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg">{task.title}</CardTitle>
              {task.description && (
                <CardDescription className="mt-1">{task.description}</CardDescription>
              )}
            </div>
            <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
          </div>
          <div className="flex items-center pt-4 gap-4 text-xs text-muted-foreground">
              <Badge variant="outline">{formatStatus(task.status)}</Badge>
              {task.dueDate && (
                  <span className={cn("flex items-center gap-1", isOverdue && "text-destructive font-semibold")}>
                      {isOverdue && <AlertCircle className="h-4 w-4" />}
                      Vence{isOverdue ? 'u' : ''} em: {format(new Date(task.dueDate), "dd 'de' MMM", { locale: ptBR })}
                  </span>
              )}
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
