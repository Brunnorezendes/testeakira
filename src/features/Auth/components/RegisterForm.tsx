'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RegisterForm() {
  // --- NOSSO ESTADO ---
  // Criamos "caixas" para guardar o que o usuário digita.
  // Começam vazias ('').
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- NOSSA FUNÇÃO DE SUBMISSÃO ---
  // Esta função será chamada quando o formulário for enviado.
  const handleSubmit = (event: React.FormEvent) => {
    // Impede que a página recarregue, que é o comportamento padrão de um formulário.
    event.preventDefault(); 
    
    // Por enquanto, apenas exibimos os dados no console do navegador.
    console.log({
      name,
      email,
      password,
    });
  };

  return (
    // Ligamos nossa função de submissão ao evento onSubmit do formulário.
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Criar Conta</CardTitle>
          <CardDescription>
            Insira seus dados abaixo para criar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu Nome Completo"
                required
                // Ligamos o valor do input ao nosso estado 'name'.
                value={name}
                // Toda vez que o usuário digita, atualizamos o estado.
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                // Ligamos o valor do input ao nosso estado 'email'.
                value={email}
                // Toda vez que o usuário digita, atualizamos o estado.
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                // Ligamos o valor do input ao nosso estado 'password'.
                value={password}
                // Toda vez que o usuário digita, atualizamos o estado.
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}