import { Category, Tag } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import HeadComponent from '../../components/HeadComponent';
import HeadBar, { autoCompleteAtom, autocompleteType } from '../../components/posts/HeadBar';
import PostBody from '../../components/posts/PostBody';
import prisma from '../../utils/prismaUtil';

type Props = {
  autocomplete: autocompleteType;
};

const Posts: NextPage<Props> = ({ autocomplete }: { autocomplete: autocompleteType }) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const categories: Category[] = await prisma.category.findMany();
  const tags: Tag[] = await prisma.tag.findMany();
  const autocomplete: autocompleteType = { categories: categories.map((category) => category.name), tags: tags.map((tag) => tag.name) };

  return {
    props: {
      autocomplete,
    },
  };
};

export default Posts;
