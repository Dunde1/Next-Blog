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
export const postInfoAtom = atom<postInfoType>({ key: 'postInfo', default: { nextCursor: undefined, hasMore: true } });

const PostBody = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [postInfo, setPostInfo] = useRecoilState(postInfoAtom);
  const searchList = useRecoilValue(searchListAtom);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const mainRef = createRef<HTMLDivElement>();
  const footerRef = createRef<HTMLDivElement>();

  const footerCheck = async () => {
    const [main, footer] = [mainRef.current, footerRef.current];
    if (!(main && footer)) return;
    const footerY = footer.getBoundingClientRect().y;
    const mainY = main.getBoundingClientRect().y;
    if (footerY - (window.innerHeight - mainY) <= 0 && !isLoading && postInfo.hasMore) requestPosts();
  };

  const requestPosts = async () => {
    setIsLoading(true);
    const { nextCursor, hasMore, results } = await getPosts(searchList, postInfo.nextCursor);
    results && setPosts([...posts, ...results]);
    setPostInfo({ nextCursor, hasMore });
    setIsLoading(false);
  };

  useEffect(() => {
    requestPosts();
  }, []);

  useEffect(() => {
    footerCheck();
  }, [isLoading]);

  return (
    <main onScroll={footerCheck} ref={mainRef}>
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
        <div className={`footer ${isLoading ? 'loading' : ''} ${postInfo.hasMore ? '' : 'no-content'}`} ref={footerRef} />
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

          ul {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
          }

          li {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 2px solid gray;
            border-radius: 10px;
          }

          .footer {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 200px;
            height: 100px;
          }

          .footer.loading::after {
            content: '';
            width: 30px;
            height: 30px;
            background-color: transparent;
            border: 5px solid transparent;
            border-top: 5px solid navy;
            border-bottom: 5px solid crimson;
            border-radius: 50%;
            animation: footer-loading-one 1.5s ease-in-out infinite, footer-loading-two 1.5s ease-in-out infinite;
          }

          @keyframes footer-loading-one {
            0% {
              transform: rotateZ(0deg);
            }
            50% {
              transform: rotateZ(180deg);
            }
          }

          @keyframes footer-loading-two {
            50% {
              transform: rotateZ(180deg);
            }
            100% {
              transform: rotateZ(360deg);
            }
          }

          .footer.no-content::after {
            content: 'NO MORE CONTENT';
            white-space: nowrap;
            font-family: netmarble;
          }
        `}
      </style>
    </main>
  );
};

export default PostBody;
