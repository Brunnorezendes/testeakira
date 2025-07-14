// src/features/TaskManager/components/TaskForm.tsx

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Task, TaskPriority, TaskStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

import { createTask } from '../actions/create-task.action';
import { updateTask } from '../actions/update-task.action';
import { taskFormSchema } from '../schemas';

interface TaskFormProps {
  task?: Task;
  onFormSubmit?: () => void;
}

export function TaskForm({ task, onFormSubmit }: TaskFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEditMode = !!task;

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: isEditMode
      ? {
          id: task.id,
          title: task.title,
          description: task.description || '',
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate || undefined,
        }
      : {
          title: '',
          description: '',
          priority: TaskPriority.MEDIA,
          dueDate: undefined,
        },
  });

  async function onSubmit(values: z.infer<typeof taskFormSchema>) {
    const action = isEditMode ? updateTask : createTask;
    // @ts-ignore
    const result = await action(values);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: result.error
      });
    } else {
      toast({
        title: "Sucesso!",
        description: result.success
      });
      if (onFormSubmit) {
        onFormSubmit();
      }
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {isEditMode && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
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
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Prioridade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
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

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Data de Vencimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Criar Tarefa')}
        </Button>
      </form>
    </Form>
  );
}
