// src/features/TaskManager/components/EditTaskDialog.tsx

'use client';

import { useState } from 'react';
import { Task } from '@prisma/client';
import { useToast } from "@/hooks/use-toast";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TaskForm } from './TaskForm';
import { deleteTask } from '../actions/delete-task.action';

// 1. Importamos os componentes do AlertDialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface EditTaskDialogProps {
  task: Task;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditTaskDialog({ task, isOpen, setIsOpen }: EditTaskDialogProps) {
  const { toast } = useToast();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    const result = await deleteTask(task.id);
    if (result.error) {
      toast({ variant: "destructive", title: "Erro", description: result.error });
    } else {
      toast({ title: "Sucesso!", description: result.success });
      setIsOpen(false); // Fecha o modal principal de edição
    }
    setIsDeleteLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription>
            Faça alterações na sua tarefa aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <TaskForm task={task} onFormSubmit={() => setIsOpen(false)} />
        
        <div className="pt-4">
          {/* 2. O botão de deletar agora é um gatilho para o AlertDialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full"
                disabled={isDeleteLoading}
              >
                {isDeleteLoading ? 'Excluindo...' : 'Excluir Tarefa'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso irá excluir permanentemente
                  esta tarefa dos nossos servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                {/* A ação de continuar chama nossa função handleDelete */}
                <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}