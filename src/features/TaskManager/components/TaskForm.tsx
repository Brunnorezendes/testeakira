// src/features/TaskManager/components/TaskForm.tsx

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TaskStatus, TaskPriority } from '@prisma/client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { taskSchema } from '../schemas'; // Importamos nosso schema Zod
import { createTask } from '../actions/create-task.action'; // Importamos a action

// Definimos as props que o formulário aceitará
interface TaskFormProps {
  onFormSubmit?: () => void; // Uma função opcional para ser chamada após o sucesso
}

export function TaskForm({ onFormSubmit }: TaskFormProps) {
  const router = useRouter();
  
  // 1. Configuração do formulário com react-hook-form e Zod
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: TaskStatus.A_FAZER,
      priority: TaskPriority.MEDIA,
    },
  });

  // 2. Função que lida com o envio do formulário
  async function onSubmit(values: z.infer<typeof taskSchema>) {
    const result = await createTask(values);

    if (result.error) {
      // No futuro, podemos usar uma biblioteca de "toasts" para mostrar erros
      alert(result.error);
    } else {
      alert(result.success);
      if (onFormSubmit) {
        onFormSubmit(); // Fecha o modal, se a função for passada
      }
      router.refresh(); // Atualiza os dados da página para mostrar a nova tarefa
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Campo de Título */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Criar relatório mensal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Campo de Descrição */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione mais detalhes sobre a tarefa..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Campo de Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={TaskStatus.A_FAZER}>A Fazer</SelectItem>
                  <SelectItem value={TaskStatus.EM_PROGRESSO}>Em Progresso</SelectItem>
                  <SelectItem value={TaskStatus.CONCLUIDO}>Concluído</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Campo de Prioridade */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prioridade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma prioridade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={TaskPriority.BAIXA}>Baixa</SelectItem>
                  <SelectItem value={TaskPriority.MEDIA}>Média</SelectItem>
                  <SelectItem value={TaskPriority.ALTA}>Alta</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Salvando...' : 'Salvar Tarefa'}
        </Button>
      </form>
    </Form>
  );
}