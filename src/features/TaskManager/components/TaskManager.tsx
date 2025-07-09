// src/features/TaskManager/components/TaskManager.tsx

'use client';

import { Task } from '@prisma/client';
import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { KanbanBoard } from './KanbanBoard';

interface TaskManagerProps {
  initialTasks: Task[];
}

export function TaskManager({ initialTasks }: TaskManagerProps) {
  const [sortOrder, setSortOrder] = useState('createdAt-desc');

  // Usamos useMemo para re-ordenar as tarefas apenas quando a ordem ou a lista inicial mudar.
  const sortedTasks = useMemo(() => {
    const tasks = [...initialTasks]; // Criamos uma cópia para não modificar o array original
    
    switch (sortOrder) {
      case 'dueDate-asc':
        return tasks.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
      case 'priority-desc':
        const priorityOrder = { 'ALTA': 3, 'MEDIA': 2, 'BAIXA': 1 };
        return tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'createdAt-desc':
      default:
        return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [initialTasks, sortOrder]);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt-desc">Mais Recentes</SelectItem>
            <SelectItem value="dueDate-asc">Data de Vencimento</SelectItem>
            <SelectItem value="priority-desc">Prioridade</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <KanbanBoard tasks={sortedTasks} />
    </div>
  );
}