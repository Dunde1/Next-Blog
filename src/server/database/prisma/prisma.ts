import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

if (prisma != null) {
  console.log('prisma connect!');
} else {
  console.error('prisma connect error.');
}

export default prisma;
