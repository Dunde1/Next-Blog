import { NextPage } from 'next';
import { IndexProps } from '@src/common/types/pageProps/index.type';
import HeadComponent from '@render/components/HeadComponent/HeadComponent';
import ScrollScreen from '@render/components/ScrollScreen/ScrollScreen';
import Home from './shared/Home/Home';
import Info from './shared/Info/Info';
import Posts from './shared/Posts/Posts';
import Projects from './shared/Projects/Projects';

const IndexRender: NextPage<IndexProps> = ({ today, total }) => {
  const screenDescription = ['home', 'information', 'blog posts', 'projects'];

  return (
    <div className="index">
      <HeadComponent title="Main" description="Main page for introduction and navigation" />
      <ScrollScreen screenDescription={screenDescription}>
        <Home visitInfo={{ today, total }} />
        <Info />
        <Posts />
        <Projects />
      </ScrollScreen>
    </div>
  );
};

export default IndexRender;
