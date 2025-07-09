import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';
import { nextCookies } from 'better-auth/next-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,

    async sendResetPassword(data) {
      try {
        await resend.emails.send({
          from: 'Akira Tasks <onboarding@resend.dev>',
          to: data.user.email,
          subject: 'Link para Redefinição de Senha',
          html: `<p>Olá, ${data.user.name}!</p><p>Clique no link abaixo para redefinir sua senha:</p><a href="${data.url}">Redefinir Senha</a><p>Se você não solicitou isso, pode ignorar este email.</p>`,
        });
      } catch (error) {
        console.error('Falha ao enviar email de reset:', error);
        // Lançar o erro garante que o better-auth saiba que o envio falhou
        throw new Error('Não foi possível enviar o email de recuperação.');
      }
    },
  },
  
  pages: {
    signIn: '/login',
  },

  appName: 'testeakira',
  
  plugins: [
    nextCookies(),
  ],

});