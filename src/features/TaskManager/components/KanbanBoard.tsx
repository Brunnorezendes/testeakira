// src/features/TaskManager/components/KanbanBoard.tsx

'use client';

import { Task, TaskStatus } from '@prisma/client';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  tasks: Task[];
}

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  // Filtramos as tarefas por status para cada coluna
  const todoTasks = tasks.filter((task) => task.status === TaskStatus.A_FAZER);
  const inProgressTasks = tasks.filter((task) => task.status === TaskStatus.EM_PROGRESSO);
  const doneTasks = tasks.filter((task) => task.status === TaskStatus.CONCLUIDO);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KanbanColumn title="A Fazer" tasks={todoTasks} />
      <KanbanColumn title="Em Progresso" tasks={inProgressTasks} />
      <KanbanColumn title="Concluído" tasks={doneTasks} />
    </div>
  );
}