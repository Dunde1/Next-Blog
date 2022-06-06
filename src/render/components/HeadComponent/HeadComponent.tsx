import Head from 'next/head';
import { HeadComponentProps } from './HeadComponent.type';

const HeadComponent = ({ title, description }: HeadComponentProps) => (
  <Head>
    <title>{`${title} | Dunde's blog`}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/public/favicon.ico" />
  </Head>
);

export default HeadComponent;
