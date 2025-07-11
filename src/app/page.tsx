// src/app/page.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <main className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Organize seu trabalho. Clarifique sua vida.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Bem-vindo ao Akira Tasks, a forma mais simples e elegante de gerenciar suas tarefas e aumentar sua produtividade.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/register">Comece de Graça</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Fazer Login</Link>
          </Button>
        </div>
      </main>

      <footer className="mt-16 text-sm text-muted-foreground">
        <p>© 2025 Akira Tasks. Desenvolvido com Next.js.</p>
      </footer>
    </div>
  );
}