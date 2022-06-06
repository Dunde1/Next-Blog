import Head from 'next/head';
import { IMAGES } from '@src/common/const/routes/file';
import { HeadComponentProps } from './HeadComponent.type';

const HeadComponent = ({ title, description }: HeadComponentProps) => (
  <Head>
    <title>{`${title} | Dunde's blog`}</title>
    <meta name="description" content={description} />
    <link rel="icon" href={IMAGES.FAVICON} />
  </Head>
);

export default HeadComponent;
