import { createRef, useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getPosts } from '../../utils/postsUtil';
import { isLoadingAtom, searchListAtom } from './HeadBar';

export type postsType = {
  created: number;
  lastEdited: number;
  category: string;
  tag: string[];
  title: string;
  description: string;
  url: string;
};

export type postInfoType = {
  nextCursor: string | null;
  hasMore: boolean;
};

export const postsAtom = atom<postsType[]>({ key: 'results', default: [] });
export const postInfoAtom = atom<postInfoType>({ key: 'postInfo', default: { nextCursor: null, hasMore: false } });

const PostBody = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [postInfo, setPostInfo] = useRecoilState(postInfoAtom);
  const searchList = useRecoilValue(searchListAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);
  const footerRef = createRef<HTMLDivElement>();

  const footerCheck = async () => {
    console.log(footerRef);
    if (!footerRef.current) return;
    const ref = footerRef.current;
    console.log(ref.offsetHeight);
  };

  const requestPosts = async (cursor?: string) => {
    setIsLoading(true);
    const { nextCursor, hasMore, results } = await getPosts(searchList, cursor);
    setPosts([...posts, ...results]);
    setPostInfo({ nextCursor, hasMore });
    setIsLoading(false);
  };

  useEffect(() => {
    requestPosts();
  }, []);

  const onScroll = () => {
    console.log('scroll!');
  };

  return (
    <main>
      <ul>
        {posts.map((v, i) => (
          <li key={i}>
            <div className="title">{v.title}</div>
            <div>{new Date(v.created).toUTCString()}</div>
          </li>
        ))}
      </ul>
      <div className="footer" ref={footerRef} />

      <style jsx>
        {`
          main {
            position: absolute;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            top: 7.5vh;
            left: 7.5vw;
            width: 85vw;
            height: 85vh;
            border: 2px solid black;
            padding: 20px;
            overflow-y: scroll;
            overflow-x: hidden;
          }

          main::-webkit-scrollbar {
            position: absolute;
            width: 8px;
          }

          main::-webkit-scrollbar-thumb {
            position: absolute;
            display: block;
            border-radius: 4px;
            border: 1px solid transparent;
            background-color: darkgray;
          }
        `}
      </style>
    </main>
  );
};

export default PostBody;
