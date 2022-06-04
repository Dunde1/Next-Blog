import { NextPage } from 'next';
import IndexServer from '@server/pages/index.server';
import HeadComponent from '../components/HeadComponent';
import Home, { HomeProps } from '../components/index/Home';
import Info from '../components/index/Info';
import Posts from '../components/index/Posts';
import Projects from '../components/index/Projects';
import ScrollButton from '../components/ScrollScreen';

const Index: NextPage<HomeProps> = ({ today, total }) => {
  const screenDescription = ['home', 'information', 'blog posts', 'projects'];

  return (
    <div className="index">
      <HeadComponent title="Main" description="Main page for introduction and navigation" />
      <ScrollButton screenDescription={screenDescription}>
        <Home today={today} total={total} />
        <Info />
        <Posts />
        <Projects />
      </ScrollButton>
    </div>
  );
};

export const getServerSideProps = IndexServer;

export default Index;
