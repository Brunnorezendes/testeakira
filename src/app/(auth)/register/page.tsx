import { RegisterForm } from '@/features/Auth/components/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar Conta',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <RegisterForm />
    </div>
  );
}