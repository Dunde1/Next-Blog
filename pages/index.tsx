import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import HeadComponent from '../components/HeadComponent';
import Home, { HomeProps } from '../components/index/Home';
import Info from '../components/index/Info';
import Posts from '../components/index/Posts';
import ScrollButton from '../components/ScrollScreen';
import { getParsingDate } from '../utils/dateUtil';

const Index: NextPage<HomeProps> = ({ today, total }) => {
  const screenDescription = ['home', 'information', 'blog posts'];

  return (
    <div className="index">
      <HeadComponent title="Main" description="Main page for introduction and navigation" />
      <ScrollButton screenDescription={screenDescription}>
        <Home today={today} total={total} />
        <Info />
        <Posts />
      </ScrollButton>
      <style jsx>{``}</style>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { year, month, date } = getParsingDate(new Date());
  const dateString = `${year}${month}${date}`;
  const prisma = new PrismaClient();
  await prisma.visit.create({
    data: { date: dateString, remoteAddress: JSON.stringify(req.headers['x-forwarded-for']) || req.socket.remoteAddress || 'undefined' },
  });
  const today: number = await prisma.visit.count({ where: { date: { equals: dateString } } });
  const total: number = await prisma.visit.count();
  prisma.$disconnect();

  return {
    props: {
      today,
      total,
    },
  };
};

export default Index;
