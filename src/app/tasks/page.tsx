// src/app/tasks/page.tsx

import { Metadata } from 'next';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { getUserTasks } from '@/features/TaskManager/actions';
import { CreateTaskDialog } from '@/features/TaskManager/components/CreateTaskDialog';
import { TaskManager } from '@/features/TaskManager/components/TaskManager'; // Importamos nosso novo gerenciador

export const metadata: Metadata = {
  title: 'Meu Quadro de Tarefas',
};

export default async function TasksPage() {
  await getCurrentUserSession();
  const tasks = await getUserTasks();

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quadro de Tarefas</h1>
          <p className="mt-2 text-muted-foreground">Organize seu trabalho de forma visual.</p>
        </div>
        <CreateTaskDialog />
      </div>
      
      {tasks.length > 0 ? (
        // Passamos as tarefas iniciais para o TaskManager
        <TaskManager initialTasks={tasks} />
      ) : (
        <div className="text-center p-8 border-2 border-dashed rounded-lg mt-8">
          <h2 className="text-xl font-semibold">Tudo limpo por aqui!</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Clique em "Criar Nova Tarefa" para começar.
          </p>
        </div>
      )}
    </div>
  );
}