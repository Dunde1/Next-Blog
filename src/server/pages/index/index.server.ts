import { GetServerSideProps } from 'next';
import { IndexProps } from '@src/common/types/pageProps/index.type';
import { getNowDate, getParsingDate } from '@src/common/utils/date/date';
import Visit from '@server/database/prisma/service/visit/visit';

const IndexServerSideProps: GetServerSideProps<IndexProps> = async ({ req }) => {
  const { year, month, date } = getParsingDate(new Date());
  const createdAt = getNowDate();
  const dateString = `${year}${month}${date}`;
  const remoteAddress = JSON.stringify(req.headers['x-forwarded-for']) || req.socket.remoteAddress || 'undefined';

  await Visit.createNowLog({ createdAt, dateString, remoteAddress });

  const today: number = await Visit.getCount({ dateString });
  const total: number = await Visit.getCount({});

  return {
    props: {
      today,
      total,
    },
  };
};

export default IndexServerSideProps;
