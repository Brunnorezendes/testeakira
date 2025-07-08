import { Metadata } from 'next';
import { ResetPasswordForm } from '@/features/Auth/components/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Redefinir Senha',
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <ResetPasswordForm />
    </div>
  );
}