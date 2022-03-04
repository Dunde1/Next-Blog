import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { getAllSearchDB } from './notionUtil';

type resultType = {
  properties: {
    tag: { multi_select: { name: string }[] };
    category: { select: { name: string } | null };
  };
};

const makePostsInfo = async () => {
  const results: resultType[] | undefined = (await getAllSearchDB()) as any;

  if (!results) {
    console.error('creation failed');
    return false;
  }

  const tags = new Set<string>();
  const categories = new Set<string>();

  results.forEach((result) => {
    const name = result.properties.category.select?.name;
    if (name) categories.add(name);
    result.properties.tag.multi_select.forEach((t) => tags.add(t.name));
  });

  const prisma = new PrismaClient();

  await prisma.category.deleteMany();
  await prisma.tag.deleteMany();

  await prisma.category.createMany({
    data: Array.from(categories).map((category) => {
      return { name: category };
    }),
  });

  await prisma.tag.createMany({
    data: Array.from(tags).map((tag) => {
      return { name: tag };
    }),
  });

  prisma.$disconnect();

  return true;
};

export default makePostsInfo;
