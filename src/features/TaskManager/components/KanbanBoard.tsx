// src/features/TaskManager/components/KanbanBoard.tsx

'use client';

import { Task, TaskStatus } from '@prisma/client';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function KanbanBoard({ tasks, onTaskClick }: KanbanBoardProps) {
  const todoTasks = tasks.filter((task) => task.status === TaskStatus.A_FAZER);
  const inProgressTasks = tasks.filter((task) => task.status === TaskStatus.EM_PROGRESSO);
  const doneTasks = tasks.filter((task) => task.status === TaskStatus.CONCLUIDO);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KanbanColumn title="A Fazer" tasks={todoTasks} onTaskClick={onTaskClick} />
      <KanbanColumn title="Em Progresso" tasks={inProgressTasks} onTaskClick={onTaskClick} />
      <KanbanColumn title="Concluído" tasks={doneTasks} onTaskClick={onTaskClick} />
    </div>
  );
}