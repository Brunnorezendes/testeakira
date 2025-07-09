// src/features/TaskManager/components/TaskCard.tsx

'use client';

import { Task, TaskStatus } from '@prisma/client';
import { format, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertCircle } from 'lucide-react'; // 1. Importamos um ícone de alerta

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils'; // Utilitário para classes condicionais

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  // 2. Lógica para verificar se a tarefa está atrasada
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
    // 3. Adicionamos uma classe condicional para a borda vermelha
    <Card className={cn(isOverdue && "border-destructive")}>
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
                    {/* 4. Adicionamos o ícone de alerta se estiver atrasada */}
                    {isOverdue && <AlertCircle className="h-4 w-4" />}
                    Vence{isOverdue ? 'u' : ''} em: {format(new Date(task.dueDate), "dd 'de' MMM", { locale: ptBR })}
                </span>
            )}
        </div>
      </CardHeader>
    </Card>
  );
}