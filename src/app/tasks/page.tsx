import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Bem-vindo ao seu Dashboard!</h1>
      <p className="mt-2">Esta é uma área protegida. Você só deveria estar vendo isso se estiver logado.</p>
    </div>
  );
}