import type { NextPage } from 'next';
import HeadComponent from '../components/HeadComponent';
import Home from '../components/index/Home';
import Info from '../components/index/Info';
import ScrollButton from '../components/ScrollScreen';

const Posts = () => {
  return <>posts</>;
};

const Index: NextPage = () => {
  const screenDescription = ['home', 'information', 'blog posts'];

  return (
    <div className="index">
      <HeadComponent title="Main" description="Main page for introduction and navigation" />
      <ScrollButton screenDescription={screenDescription}>
        <Home />
        <Info />
        <Posts />
      </ScrollButton>
      <style jsx>{``}</style>
    </div>
  );
};

export default Index;
