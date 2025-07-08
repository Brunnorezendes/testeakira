// src/_shared/components/AuthCardWrapper.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

// Definimos as propriedades que nosso invólucro irá aceitar
interface AuthCardWrapperProps {
  title: string;
  description: string;
  children?: React.ReactNode; // 'children' é uma propriedade especial para renderizar o conteúdo
}

export function AuthCardWrapper({ title, description, children }: AuthCardWrapperProps) {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}