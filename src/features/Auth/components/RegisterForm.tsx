'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client'; // 1. Importamos o CLIENTE de auth
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
import Link from 'next/link';

export function RegisterForm() {
  // 2. Voltamos a usar 'useState' para os campos e erros
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 3. Esta é a nossa função de submissão
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // 4. A MÁGICA FINAL: Usamos o authClient para registrar
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      // Se o better-auth retornar um erro na sua resposta
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      setSuccess('Conta criada com sucesso! Você pode fazer o login.');

    } catch (err: any) {
      // Se a chamada falhar, mostramos o erro
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Criar Conta</CardTitle>
        <CardDescription>
          Insira seus dados abaixo para criar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* 5. O formulário agora chama nossa função handleSubmit */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu Nome Completo"
                required
                value={name}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-destructive">
                {error}
              </p>
            )}

            {success && (
              <p className="text-sm font-medium text-emerald-500">
                {success}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>

            <div className="mt-4 text-center text-sm">
              Já possui uma conta?{' '}
              <Link href="/login" className="underline">
                Fazer login
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}