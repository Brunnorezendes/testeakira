// src/app/tasks/page.tsx

import { Metadata } from 'next';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { getUserTasks } from '@/features/TaskManager/actions';
import { CreateTaskDialog } from '@/features/TaskManager/components/CreateTaskDialog';
import { TaskCard } from '@/features/TaskManager/components/TaskCard'; // 1. Importamos nosso novo card

export const metadata: Metadata = {
  title: 'Minhas Tarefas',
};

export default async function TasksPage() {
  const session = await getCurrentUserSession();
  const tasks = await getUserTasks();

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Bem-vindo, {session.user?.name}!</h1>
          <p className="mt-2 text-muted-foreground">Aqui estão suas tarefas atuais.</p>
        </div>
        <CreateTaskDialog />
      </div>

      <div>
        {tasks.length > 0 ? (
          // 2. Usamos um grid para exibir os cards de forma organizada
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          // 3. A mensagem para quando não há tarefas
          <div className="text-center p-8 border-2 border-dashed rounded-lg mt-8">
            <h2 className="text-xl font-semibold">Tudo limpo por aqui!</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Clique em "Criar Nova Tarefa" para começar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}