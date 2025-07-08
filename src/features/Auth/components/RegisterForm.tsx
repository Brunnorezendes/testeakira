'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthCardWrapper } from '@/_shared/components/AuthCardWrapper';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await authClient.signUp.email({ name, email, password });
      if (result.error) {
        throw new Error(result.error.message);
      }
      setSuccess('Conta criada com sucesso! Você já pode fazer o login.');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCardWrapper
      title="Criar Conta"
      description="Insira seus dados abaixo para criar sua conta."
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Seu Nome Completo" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          {success && <p className="text-sm font-medium text-emerald-500">{success}</p>}
          <Button type="submit" className="w-full" disabled={isLoading || !!success}>
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
    </AuthCardWrapper>
  );
}