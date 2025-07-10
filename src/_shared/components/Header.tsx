// src/_shared/components/Header.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from '@/features/Auth/actions/signOut.action';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-6">
        <Link href="/tasks" className="text-xl font-bold">
          Akira Tasks
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/tasks" className="text-muted-foreground hover:text-primary">
            Quadro
          </Link>
          <Link href="/profile" className="text-muted-foreground hover:text-primary">
            Perfil
          </Link>
        </nav>
      </div>
      <div>
        {/* Usamos um <form> para chamar a Server Action de logout */}
        <form action={signOut}>
          <Button variant="outline">Sair</Button>
        </form>
      </div>
    </header>
  );
}