// src/features/TaskManager/components/TaskManager.tsx - VERSÃO FINAL, ESTÁVEL E COMPLETA

'use client';

import { Task, TaskPriority, TaskStatus } from '@prisma/client';
import { useState, useMemo, useEffect } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { createPortal } from 'react-dom';

// Importações do dnd-kit para o Drag and Drop
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

// Importações dos seus componentes e hooks
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { KanbanBoard } from './KanbanBoard';
import { TaskList } from './TaskList';
import { EditTaskDialog } from './EditTaskDialog';
import { TaskCard } from './TaskCard';
import { useToast } from '@/hooks/use-toast';
import { updateTaskStatus } from '../actions/update-task-status.action';

type ViewMode = 'kanban' | 'list';

interface TaskManagerProps {
  initialTasks: Task[];
}

export function TaskManager({ initialTasks }: TaskManagerProps) {
  const { toast } = useToast();
  
  // --- ESTADOS FUNDAMENTAIS (PRESERVADOS E CORRIGIDOS) ---
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null); // Para o 'fantasma' do D&D
  const [isMounted, setIsMounted] = useState(false);

  // Estados dos filtros e ordenação que foram acidentalmente removidos
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('createdAt-desc');
  // --------------------------------------------------------

  // useEffect para sincronizar com os dados do servidor (corrige a atualização após criar tarefa)
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  // useEffect para garantir que o código do lado do cliente rode com segurança
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // useMemo para filtrar e ordenar a lista de tarefas de forma eficiente
  const filteredAndSortedTasks = useMemo(() => {
    let tasksToProcess = [...tasks];
    if (statusFilter !== 'ALL') tasksToProcess = tasksToProcess.filter((task) => task.status === statusFilter);
    if (priorityFilter !== 'ALL') tasksToProcess = tasksToProcess.filter((task) => task.priority === priorityFilter);
    switch (sortOrder) {
      case 'dueDate-asc': return tasksToProcess.sort((a, b) => (!a.dueDate ? 1 : !b.dueDate ? -1 : new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
      case 'priority-desc': const priorityOrder = { 'ALTA': 3, 'MEDIA': 2, 'BAIXA': 1 }; return tasksToProcess.sort((a, b) => priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]);
      default: return tasksToProcess.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [tasks, statusFilter, priorityFilter, sortOrder]);

  const todoTasks = filteredAndSortedTasks.filter((task) => task.status === TaskStatus.A_FAZER);
  const inProgressTasks = filteredAndSortedTasks.filter((task) => task.status === TaskStatus.EM_PROGRESSO);
  const doneTasks = filteredAndSortedTasks.filter((task) => task.status === TaskStatus.CONCLUIDO);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  function handleDragStart(event: DragStartEvent) {
    setActiveTask(event.active.data.current?.task ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeTaskData = active.data.current?.task as Task;
      const newStatus = over.id as TaskStatus;

      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((t) => t.id === active.id);
        if (activeIndex === -1) return prevTasks;
        prevTasks[activeIndex].status = newStatus;
        return [...prevTasks];
      });

      const result = await updateTaskStatus({ taskId: activeTaskData.id, status: newStatus });
      if (result?.error) {
        toast({ variant: 'destructive', title: 'Erro ao mover tarefa', description: 'A mudança não pôde ser salva. Revertendo.' });
        setTasks(initialTasks);
      }
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div>
        <div className="flex flex-col sm:flex-row gap-4 justify-end mb-4">
          <div className="flex items-center gap-2 mr-auto">
            <Button variant={viewMode === 'kanban' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('kanban')}> <LayoutGrid className="h-4 w-4" /> </Button>
            <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')}> <List className="h-4 w-4" /> </Button>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filtrar por status..." /></SelectTrigger><SelectContent><SelectItem value="ALL">Todos os Status</SelectItem><SelectItem value="A_FAZER">A Fazer</SelectItem><SelectItem value="EM_PROGRESSO">Em Progresso</SelectItem><SelectItem value="CONCLUIDO">Concluído</SelectItem></SelectContent></Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filtrar por prioridade..." /></SelectTrigger><SelectContent><SelectItem value="ALL">Todas as Prioridades</SelectItem><SelectItem value="ALTA">Alta</SelectItem><SelectItem value="MEDIA">Média</SelectItem><SelectItem value="BAIXA">Baixa</SelectItem></SelectContent></Select>
          <Select value={sortOrder} onValueChange={setSortOrder}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Ordenar por..." /></SelectTrigger><SelectContent><SelectItem value="createdAt-desc">Mais Recentes</SelectItem><SelectItem value="dueDate-asc">Data de Vencimento</SelectItem><SelectItem value="priority-desc">Prioridade</SelectItem></SelectContent></Select>
        </div>
        <div>
          {viewMode === 'kanban' && <KanbanBoard todoTasks={todoTasks} inProgressTasks={inProgressTasks} doneTasks={doneTasks} onTaskClick={setEditingTask} />}
          {viewMode === 'list' && <TaskList tasks={filteredAndSortedTasks} onTaskClick={setEditingTask} />}
        </div>
      </div>
      {editingTask && ( <EditTaskDialog task={editingTask} isOpen={!!editingTask} setIsOpen={() => setEditingTask(null)} /> )}
      
      {isMounted && createPortal(
        <DragOverlay>
          {activeTask ? (<TaskCard task={activeTask} onClick={() => {}} />) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}