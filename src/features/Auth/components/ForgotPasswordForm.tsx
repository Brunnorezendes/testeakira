'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthCardWrapper } from '@/_shared/components/AuthCardWrapper'; // 1. Importamos o Wrapper

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await authClient.requestPasswordReset({
        email,
        redirectTo: '/reset-password',
      });
      if (result && result.error) {
        throw new Error(result.error.message);
      }
      setSuccess('Se um usuário com este e-mail existir, um link de recuperação será enviado.');
    } catch (err: any) {
      setError('Ocorreu um erro ao tentar enviar o link. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 2. Usamos o Wrapper, simplificando o código
    <AuthCardWrapper
      title="Esqueceu a Senha?"
      description="Digite seu e-mail e enviaremos um link para redefinir sua senha."
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
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
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          {success && <p className="text-sm font-medium text-emerald-500">{success}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
          </Button>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline">
              Voltar para o Login
            </Link>
          </div>
        </div>
      </form>
    </AuthCardWrapper>
  );
}