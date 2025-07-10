// src/features/TaskManager/components/KanbanBoard.tsx - Versão Simplificada

'use client';

import { Task } from '@prisma/client';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  todoTasks: Task[];
  inProgressTasks: Task[];
  doneTasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function KanbanBoard({ 
  todoTasks, 
  inProgressTasks, 
  doneTasks, 
  onTaskClick 
}: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KanbanColumn title="A Fazer" status="A_FAZER" tasks={todoTasks} onTaskClick={onTaskClick} />
      <KanbanColumn title="Em Progresso" status="EM_PROGRESSO" tasks={inProgressTasks} onTaskClick={onTaskClick} />
      <KanbanColumn title="Concluído" status="CONCLUIDO" tasks={doneTasks} onTaskClick={onTaskClick} />
    </div>
  );
}