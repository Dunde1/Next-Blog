import type { NextPage } from 'next';
import HeadComponent from '../components/HeadComponent';
import ScrollButton from '../components/ScrollScreen';

const Home = () => {
  return (
    <>
      <div className="home">home</div>
    </>
  );
};

const Info = () => {
  return <>info</>;
};

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
