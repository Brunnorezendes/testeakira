import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,

    async sendResetPassword(data) {
      console.log(`[LINK DE RESET DE SENHA]: ${data.url}`);
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