// src/features/Auth/components/ResetPasswordForm.tsx

'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthCardWrapper } from '@/_shared/components/AuthCardWrapper';

function ResetPasswordFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!token) {
      setError('Token de redefinição inválido ou ausente.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await authClient.resetPassword({ token, newPassword });
      if (result && result.error) {
        throw new Error(result.error.message);
      }
      setSuccess('Sua senha foi redefinida com sucesso! Redirecionando para o login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Não foi possível redefinir a senha. O link pode ter expirado.');
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthCardWrapper
        title="Erro de Token"
        description="O link de redefinição é inválido ou o token está ausente. Por favor, solicite um novo link."
      >
      </AuthCardWrapper>
    );
  }

  return (
    <AuthCardWrapper
      title="Redefinir Senha"
      description="Digite sua nova senha abaixo."
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Nova Senha</Label>
            <Input id="password" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          {success && <p className="text-sm font-medium text-emerald-500">{success}</p>}
          <Button type="submit" className="w-full" disabled={isLoading || !!success}>
            {isLoading ? 'Salvando...' : 'Salvar Nova Senha'}
          </Button>
        </div>
      </form>
    </AuthCardWrapper>
  );
}

export function ResetPasswordForm() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResetPasswordFormComponent />
    </Suspense>
  );
}