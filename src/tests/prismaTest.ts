import prisma from '../lib/prisma';

async function main() {
  const users = await prisma.user.findMany();
  console.log('Usuários encontrados:', users);
}

main()
  .catch((e) => {
    console.error('Erro ao conectar ao banco:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });