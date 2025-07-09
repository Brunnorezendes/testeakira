// src/app/tasks/page.tsx

import { Metadata } from 'next';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { getUserTasks } from '@/features/TaskManager/actions';
// 1. Importamos nosso novo componente de modal
import { CreateTaskDialog } from '@/features/TaskManager/components/CreateTaskDialog';

export const metadata: Metadata = {
  title: 'Minhas Tarefas',
};

export default async function TasksPage() {
  const session = await getCurrentUserSession();
  const tasks = await getUserTasks();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Bem-vindo, {session.user?.name}!</h1>
          <p className="mt-2 text-muted-foreground">Aqui estão suas tarefas atuais.</p>
        </div>
        {/* 2. Adicionamos o nosso componente aqui */}
        <CreateTaskDialog />
      </div>

      <div>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="border-b p-2">
                {task.title}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold">Tudo limpo por aqui!</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Você ainda não tem nenhuma tarefa. Que tal criar a primeira?
            </p>
            {/* O botão agora fica visível para o usuário */}
          </div>
        )}
      </div>
    </div>
  );
}