import Image from 'next/image';
import Link from 'next/link';
import { createRef, UIEvent, useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getParsingDate } from '../../utils/dateUtil';
import { getPosts } from '../../utils/postsUtil';
import { isLoadingAtom, searchListAtom } from './HeadBar';

export type postsType = {
  created: number;
  lastEdited: number;
  image: string | null;
  category: { name: string; color: string };
  tag: { name: string; color: string }[];
  title: string;
  description: string;
  url: string;
};

export type postInfoType = {
  nextCursor: string | undefined;
  hasMore: boolean;
};

export const postsAtom = atom<postsType[]>({ key: 'results', default: [] });
export const postInfoAtom = atom<postInfoType>({ key: 'postInfo', default: { nextCursor: undefined, hasMore: false } });

const PostBody = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [postInfo, setPostInfo] = useRecoilState(postInfoAtom);
  const searchList = useRecoilValue(searchListAtom);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const mainRef = createRef<HTMLDivElement>();
  const footerRef = createRef<HTMLDivElement>();

  const footerCheck = async (footer: HTMLDivElement, main: HTMLDivElement) => {
    if (footer.getBoundingClientRect().y - (window.innerHeight - main.getBoundingClientRect().y) <= 0 && !isLoading && postInfo.hasMore)
      requestPosts(postInfo.nextCursor);
  };

  const requestPosts = async (cursor?: string) => {
    setIsLoading(true);
    const { nextCursor, hasMore, results } = await getPosts(searchList, cursor);
    results && setPosts([...posts, ...results]);
    setPostInfo({ nextCursor, hasMore });
    setIsLoading(false);
  };

  useEffect(() => {
    requestPosts();
  }, []);

  useEffect(() => {
    if (footerRef.current && mainRef.current !== null) footerCheck(footerRef.current, mainRef.current);
  }, []);

  const onScroll = (e: UIEvent) => {
    if (footerRef.current && mainRef.current !== null) footerCheck(footerRef.current, mainRef.current);
  };

  return (
    <main onScroll={onScroll} ref={mainRef}>
      <ul>
        {posts.map((v, i) => {
          const createDate = getParsingDate(new Date(v.created));
          const updateDate = getParsingDate(new Date(v.lastEdited));

          return (
            <li key={i}>
              <Link href={v.url}>
                <a target="_blank" />
              </Link>
              <div className="head">
                <span className="create">{`${createDate.year}${createDate.month}${createDate.day}`}</span>
                <span className="update">{`${updateDate.year}${updateDate.month}${updateDate.day}`}</span>
              </div>
              <div className="image">{v.image ? <Image src={v.image} layout="fill" /> : <div className="no-image" />}</div>
              <span className="title">{v.title}</span>
              <button className="category">{v.category.name + ' ' + v.category.color}</button>
              <div className="tag">
                {v.tag.map((t, i) => (
                  <button key={i}>{t.name + ' ' + t.color}</button>
                ))}
              </div>
              <span className="description">{v.description}</span>
            </li>
          );
        })}
        <div className="footer" ref={footerRef} />
      </ul>

      <style jsx>
        {`
          main {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
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

          li {
            height: 100px;
          }

          .footer {
            position: relative;
            display: flex;
            width: 10px;
            height: 10px;
            background-color: black;
          }
        `}
      </style>
    </main>
  );
};

export default PostBody;
