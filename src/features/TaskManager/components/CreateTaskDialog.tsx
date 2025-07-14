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
import { TaskForm } from './TaskForm';

export function CreateTaskDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Criar Nova Tarefa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
          <DialogDescription>
            Preencha os detalhes abaixo para criar uma nova tarefa.
          </DialogDescription>
        </DialogHeader>
        <TaskForm onFormSubmit={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
