// src/app/tasks/page.tsx

import { Metadata } from 'next';
import { getCurrentUserSession } from '@/_shared/services/sessionService';
import { getUserTasks } from '@/features/TaskManager/actions/index'; // Importamos nossa nova action

export const metadata: Metadata = {
  title: 'Minhas Tarefas',
};

export default async function TasksPage() {
  // 1. Verificamos a sessão e pegamos os dados do usuário
  const session = await getCurrentUserSession();

  // 2. Buscamos as tarefas do usuário logado
  const tasks = await getUserTasks();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Bem-vindo, {session.user?.name}!</h1>
        <p className="mt-2 text-muted-foreground">Aqui estão suas tarefas atuais.</p>
      </div>

      {/* 3. Lógica para exibir as tarefas ou uma mensagem */}
      <div>
        {tasks.length > 0 ? (
          // No futuro, aqui chamaremos um componente <TaskList tasks={tasks} />
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="border-b p-2">
                {task.title}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <p>Você ainda não tem nenhuma tarefa.</p>
            <p className="text-sm text-muted-foreground">Que tal criar a primeira?</p>
            {/* No futuro, aqui teremos um <CreateTaskButton /> */}
          </div>
        )}
      </div>
    </div>
  );
}