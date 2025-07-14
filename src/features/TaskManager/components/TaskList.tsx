// src/features/TaskManager/components/TaskList.tsx

'use client';

import { Task } from '@prisma/client';
import { TaskListItem } from './TaskListItem';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function TaskList({ tasks, onTaskClick }: TaskListProps) {
  return (
    <div className="border rounded-lg">
      {/* Cabeçalho da Lista */}
      <div className="flex items-center p-4 border-b bg-muted/50 text-sm font-semibold text-muted-foreground">
        <div className="flex-1 pr-4">TAREFA</div>
        <div className="flex items-center gap-4 w-auto md:w-1/3 justify-end">
          <span className="w-28 text-center hidden md:block">STATUS</span>
          <span className="w-20 text-center hidden sm:block">PRIORIDADE</span>
          <span className="w-36 text-right">VENCIMENTO</span>
        </div>
      </div>
      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskListItem 
              key={task.id} 
              task={task} 
              onClick={() => onTaskClick(task)} 
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground p-8">Nenhuma tarefa encontrada para os filtros selecionados.</p>
        )}
      </div>
    </div>
  );
}
