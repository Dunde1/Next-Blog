import { Category, PrismaClient, Tag } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import HeadComponent from '../../components/HeadComponent';
import HeadBar, { autoCompleteAtom, autocompleteType } from '../../components/posts/HeadBar';
import PostBody from '../../components/posts/PostBody';

type Props = {
  autocomplete: autocompleteType;
};

const RecoilSub = ({ autocomplete }: { autocomplete: autocompleteType }) => {
  const setAutoComplete = useSetRecoilState(autoCompleteAtom);

  useEffect(() => {
    setAutoComplete(autocomplete);
  }, []);

  return (
    <div className="posts">
      <HeadComponent title="Posts" description="Post page for information" />
      <HeadBar />
      <PostBody />

      <style jsx>{`
        .posts {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

const Posts: NextPage<Props> = (props) => {
  return (
    <RecoilRoot>
      <RecoilSub autocomplete={props.autocomplete} />
    </RecoilRoot>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const categories: Category[] = await prisma.category.findMany();
  const tags: Tag[] = await prisma.tag.findMany();
  prisma.$disconnect();
  const autocomplete: autocompleteType = { categories: categories.map((category) => category.name), tags: tags.map((tag) => tag.name) };

  return {
    props: {
      autocomplete,
    },
  };
};

export default Posts;
