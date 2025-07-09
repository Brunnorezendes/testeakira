// src/features/TaskManager/components/TaskListItem.tsx

'use client';

import { Task, TaskStatus } from '@prisma/client';
import { format, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaskListItemProps {
  task: Task;
  onClick: () => void; // Prop para tornar a linha clicável
}

export function TaskListItem({ task, onClick }: TaskListItemProps) {
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
    <button 
      onClick={onClick} 
      className="flex items-center p-4 border-b hover:bg-muted/50 w-full text-left"
    >
      <div className="flex-1 pr-4">
        <p className="font-medium">{task.title}</p>
        {task.description && (
          <p className="text-sm text-muted-foreground mt-1 truncate">
            {task.description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground w-auto md:w-1/3 justify-end">
        <Badge variant="outline" className="w-28 justify-center hidden md:flex">
          {formatStatus(task.status)}
        </Badge>
        <Badge variant={getPriorityVariant(task.priority)} className="w-20 justify-center hidden sm:flex">
          {task.priority}
        </Badge>
        {task.dueDate ? (
          <span className={cn("w-36 text-right", isOverdue && "text-destructive font-semibold flex items-center justify-end gap-1")}>
            {isOverdue && <AlertCircle className="h-4 w-4" />}
            {format(new Date(task.dueDate), "dd MMM, yyyy", { locale: ptBR })}
          </span>
        ) : (
          <div className="w-36" /> /* Espaçador para manter o alinhamento */
        )}
      </div>
    </button>
  );
}