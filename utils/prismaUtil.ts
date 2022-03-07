import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
prisma ? console.log('prisma connect!') : console.error('prisma connect error.');

export default prisma;
