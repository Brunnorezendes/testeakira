// src/features/TaskManager/components/KanbanColumn.tsx

'use client';

import { Task } from '@prisma/client';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function KanbanColumn({ title, tasks, onTaskClick }: KanbanColumnProps) {
  return (
    <div className="flex flex-col gap-4 bg-muted/50 p-4 rounded-lg min-h-[200px]">
      <h2 className="text-lg font-semibold text-center tracking-wider">{title}</h2>
      <div className="flex flex-col gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onClick={() => onTaskClick(task)} 
            />
          ))
        ) : (
          <p className="text-sm text-center text-muted-foreground pt-4">Nenhuma tarefa aqui.</p>
        )}
      </div>
    </div>
  );
}