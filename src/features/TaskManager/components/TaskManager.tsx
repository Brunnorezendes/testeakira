// src/features/TaskManager/components/TaskManager.tsx

'use client';

import { Task } from '@prisma/client';
import { useState, useMemo } from 'react';
import { LayoutGrid, List } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { KanbanBoard } from './KanbanBoard';
import { TaskList } from './TaskList'; // Importamos a nova lista

// Definimos os tipos de visualização possíveis
type ViewMode = 'kanban' | 'list';

interface TaskManagerProps {
  initialTasks: Task[];
}

export function TaskManager({ initialTasks }: TaskManagerProps) {
  // 1. Adicionamos estado para controlar a visualização
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('createdAt-desc');

  const filteredAndSortedTasks = useMemo(() => {
    // ... a lógica de filtro e ordenação permanece exatamente a mesma
    let tasks = [...initialTasks];
    if (statusFilter !== 'ALL') tasks = tasks.filter((task) => task.status === statusFilter);
    if (priorityFilter !== 'ALL') tasks = tasks.filter((task) => task.priority === priorityFilter);
    switch (sortOrder) {
      case 'dueDate-asc': return tasks.sort((a, b) => (!a.dueDate ? 1 : !b.dueDate ? -1 : new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
      case 'priority-desc': const priorityOrder = { 'ALTA': 3, 'MEDIA': 2, 'BAIXA': 1 }; return tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      default: return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [initialTasks, statusFilter, priorityFilter, sortOrder]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 justify-end mb-4">
        {/* 2. Adicionamos os botões para alternar a visualização */}
        <div className="flex items-center gap-2 mr-auto">
          <Button variant={viewMode === 'kanban' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('kanban')}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')}>
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* Filtros e Ordenação */}
        <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filtrar por status..." /></SelectTrigger><SelectContent><SelectItem value="ALL">Todos os Status</SelectItem><SelectItem value="A_FAZER">A Fazer</SelectItem><SelectItem value="EM_PROGRESSO">Em Progresso</SelectItem><SelectItem value="CONCLUIDO">Concluído</SelectItem></SelectContent></Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filtrar por prioridade..." /></SelectTrigger><SelectContent><SelectItem value="ALL">Todas as Prioridades</SelectItem><SelectItem value="ALTA">Alta</SelectItem><SelectItem value="MEDIA">Média</SelectItem><SelectItem value="BAIXA">Baixa</SelectItem></SelectContent></Select>
        <Select value={sortOrder} onValueChange={setSortOrder}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Ordenar por..." /></SelectTrigger><SelectContent><SelectItem value="createdAt-desc">Mais Recentes</SelectItem><SelectItem value="dueDate-asc">Data de Vencimento</SelectItem><SelectItem value="priority-desc">Prioridade</SelectItem></SelectContent></Select>
      </div>

      {/* 3. Renderizamos o componente correto com base no viewMode */}
      <div>
        {viewMode === 'kanban' && <KanbanBoard tasks={filteredAndSortedTasks} />}
        {viewMode === 'list' && <TaskList tasks={filteredAndSortedTasks} />}
      </div>
    </div>
  );
}