// src/features/TaskManager/components/CreateTaskDialog.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TaskForm } from './TaskForm'; // Importamos nosso formulário de tarefas

export function CreateTaskDialog() {
  // 1. Criamos um estado para controlar se o modal está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  return (
    // 2. Usamos o componente Dialog do shadcn
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* O DialogTrigger é o elemento que abre o modal */}
      <DialogTrigger asChild>
        <Button>Criar Nova Tarefa</Button>
      </DialogTrigger>
      {/* O DialogContent é o conteúdo que aparece dentro do modal */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
          <DialogDescription>
            Preencha os detalhes abaixo para criar uma nova tarefa.
          </DialogDescription>
        </DialogHeader>
        {/* 3. Colocamos nosso TaskForm aqui dentro! */}
        <TaskForm onFormSubmit={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}