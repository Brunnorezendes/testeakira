// src/features/Profile/components/UserProfileForm.tsx

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import { User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // 1. Importamos o useRouter

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

import { updateUserSchema } from '../schemas';
import { updateUser } from '../actions/update-user.action';

interface UserProfileFormProps {
  user: User;
  onFormSubmit?: () => void;
}

const avatars = [
  { id: 'boy', path: '/avatars/boy.png' },
  { id: 'girl', path: '/avatars/girl.png' },
];

export function UserProfileForm({ user, onFormSubmit }: UserProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter(); // 2. Criamos uma instância do roteador

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name || '',
      image: user.image || undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof updateUserSchema>) {
    const result = await updateUser(values);

    if (result.error) {
      toast({ variant: "destructive", title: "Erro", description: result.error });
    } else {
      toast({ title: "Sucesso!", description: result.success });
      if (onFormSubmit) onFormSubmit();
      
      // 3. AQUI ESTÁ A CORREÇÃO LÓGICA
      // Forçamos o cliente a buscar os novos dados do servidor
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Escolha seu Avatar</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  {avatars.map((avatar) => (
                    <FormItem key={avatar.id} className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={avatar.path} id={avatar.id} className="sr-only" />
                      </FormControl>
                      <Label
                        htmlFor={avatar.id}
                        className={cn(
                          "cursor-pointer rounded-full border-2 border-transparent",
                          field.value === avatar.path && "border-primary"
                        )}
                      >
                        <Image
                          src={avatar.path}
                          alt={`Avatar ${avatar.id}`}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </Form>
  );
}