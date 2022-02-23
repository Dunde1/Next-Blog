import Head from 'next/head';

type props = {
  title: string;
  description: string;
};

const HeadComponent = ({ title, description }: props) => {
  return (
    <Head>
      <title>{`${title} | Dunde's blog`}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadComponent;
