import { Metadata } from 'next';
import { ForgotPasswordForm } from '@/features/Auth/components/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Recuperar Senha',
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <ForgotPasswordForm />
    </div>
  );
}