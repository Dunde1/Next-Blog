import { VisitCreateNowLogProps, VisitGetCountProps } from './visit.type';
import prisma from '../prisma';

const Visit = {
  createNowLog: (props: VisitCreateNowLogProps) => {
    const { createdAt, dateString: date, remoteAddress } = props;
    return prisma.visit.create({
      data: {
        createdAt,
        date,
        remoteAddress,
      },
    });
  },
  getCount: ({ dateString }: VisitGetCountProps) => {
    const searchFilter =
      dateString != null ? { where: { date: { equals: dateString } } } : undefined;
    return prisma.visit.count(searchFilter);
  },
};

export default Visit;
