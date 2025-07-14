// src/features/TaskManager/components/KanbanColumn.tsx - Versão Soltável

'use client';

import { useDroppable } from '@dnd-kit/core';
import { Task, TaskStatus } from '@prisma/client';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function KanbanColumn({ title, status, tasks, onTaskClick }: KanbanColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col gap-4 bg-muted/50 p-4 rounded-lg min-h-[200px] transition-colors",
        isOver && "bg-primary/20"
      )}
    >
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
