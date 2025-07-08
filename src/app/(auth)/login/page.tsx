import { Metadata } from 'next';
import { LoginForm } from '../../../features/Auth/components/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Acesse sua conta para gerenciar suas tarefas.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}