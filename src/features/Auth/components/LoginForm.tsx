'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthCardWrapper } from '@/_shared/components/AuthCardWrapper';
import { signIn } from '../actions/signIn.action';
import { sign } from 'crypto';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await authClient.signIn.email({ email, password });
      if (result && result.error) {
        throw new Error(result.error.message);
      }
      console.log('Login successful:', result);
      signIn();
      console.log('Redirecionando para /tasks');
      router.push('/tasks');
    } catch (err: any) {
      setError(err.message || 'Credenciais inválidas ou erro no servidor.');
      setIsLoading(false);
    }
  };

  return (
    <AuthCardWrapper
      title="Login"
      description="Insira seu email abaixo para acessar sua conta."
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
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{' '}
            <Link href="/register" className="underline">
              Criar conta
            </Link>
          </div>
          <div className="text-center text-sm">
            Esqueceu a senha?{' '}
            <Link href="/forgot-password" className="underline">
              Trocar senha
            </Link>
          </div>
          <div>
            <Link href="/" className="text-muted-foreground hover:text-primary underline">
                Voltar para a página inicial
            </Link>
        </div>
        </div>
      </form>
    </AuthCardWrapper>
  );
}
