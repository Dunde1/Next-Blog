import Image from 'next/image';
import Link from 'next/link';
import { createRef, MouseEvent, UIEvent, useEffect } from 'react';
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

const PostContent = ({ content, requestPosts }: { content: postsType; requestPosts: Function }) => {
  const { created, lastEdited, url, image, title, category, tag, description } = content;
  const parsingCreateDate = getParsingDate(new Date(created));
  const updateDate = new Date(lastEdited);
  const parsingUpdateDate = getParsingDate(new Date(lastEdited));
  updateDate.setDate(updateDate.getDate() + 7);
  const isNewUpdate = updateDate.getDate() > new Date().getDate();
  const [searchList, setSearchList] = useRecoilState(searchListAtom);
  const setPosts = useSetRecoilState(postsAtom);

  const clickCategory = (category: string) => {
    setSearchList([`@${category}`]);
    setPosts([]);
    requestPosts([`@${category}`], []);
  };

  const clickTag = (tag: string) => {
    setSearchList([`#${tag}`]);
    setPosts([]);
    requestPosts([`#${tag}`], []);
  };

  return (
    <li>
      <div className="link">
        <Link href={url.replace('www', 'dunde').replace('so', 'site')}>
          <a target="_blank" />
        </Link>
      </div>
      <div className="head">
        <span className="create">{`${parsingCreateDate.year}${parsingCreateDate.month}${parsingCreateDate.date}`}</span>
        <span className={`update ${isNewUpdate ? 'new' : ''}`}>{`${parsingUpdateDate.year}${parsingUpdateDate.month}${parsingUpdateDate.date}`}</span>
      </div>
      <div className="image">
        <Image src={image || '/images/no-image.png'} layout="fill" objectFit="cover" alt={title} priority />
      </div>
      <span className="title">{title}</span>
      <button className="category" style={{ backgroundColor: `var(--${category.color}-list)` }} onClick={() => clickCategory(category.name)}>
        {category.name}
      </button>
      <div className="tag">
        {tag.map((t, i) => (
          <button key={i} style={{ backgroundColor: `var(--${t.color}-list)` }} onClick={() => clickTag(t.name)}>
            {t.name}
          </button>
        ))}
      </div>
      <span className="description">{description}</span>

      <style jsx>
        {`
          li {
            --default-list: #646464;
            --gray-list: #8c8c8c;
            --brown-list: #992323;
            --orange-list: #d48a00;
            --yellow-list: #aaaa00;
            --green-list: #008a00;
            --blue-list: #2e2edd;
            --purple-list: #851e85;
            --pink-list: #b45162;
            --red-list: #c50000;
          }

          li {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 220px;
            gap: 5px;
            border: 2px solid gray;
            border-radius: 10px;
            padding: 10px;
            font-family: BMJUA;
            box-shadow: 1px 1px 2px gray;
            overflow: hidden;
          }

          .link > a {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 1;
            cursor: pointer;
          }

          .head {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            gap: 20px;
            font-family: LABDigital;
            font-size: 14px;
            padding: 0 10px 5px 10px;
            border-bottom: 1px solid gray;
            cursor: pointer;
            z-index: 2;
          }

          .create:hover::after {
            content: 'Create Date';
            position: absolute;
            top: 0;
            left: 0;
            background-color: whitesmoke;
          }

          .update.new::before {
            content: 'new';
            font-family: BMJUA;
            font-size: 12px;
            color: whitesmoke;
            background-color: darkmagenta;
            border-radius: 5px;
            margin-right: 5px;
            padding: 0 3px;
            animation: color-change 0.3s linear alternate infinite;
          }

          .update.new:hover::before {
            visibility: hidden;
          }

          .update:hover::after {
            content: 'Update Date';
            position: absolute;
            top: 0;
            right: 0;
            background-color: whitesmoke;
          }

          @keyframes color-change {
            from {
              background-color: darkmagenta;
            }
            to {
              background-color: deeppink;
            }
          }

          .image {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 200px;
            height: 150px;
            border: 1.5px solid gray;
            border-radius: 8px;
            background-color: lightblue;
            overflow: hidden;
          }

          .image::before {
            content: 'LOADING...';
            position: absolute;
          }

          .title {
            position: relative;
            text-align: center;
            width: 200px;
            border-radius: 10px;
            padding: 5px;
            box-shadow: 1px 1px 2px inset gray;
            word-break: keep-all;
          }

          .category {
            position: relative;
            width: 70%;
            font-family: BMJUA;
            font-size: 20px;
            color: whitesmoke;
            padding: 2px 5px;
            border-radius: 5px;
            box-shadow: -2px -2px 3px rgba(0, 0, 0, 0.2) inset, 2px 2px 3px rgba(0, 0, 0, 0.2);
            z-index: 2;
          }

          .category:hover::after {
            content: '@category';
            position: absolute;
            font-size: 12px;
            color: black;
            background-color: beige;
            border-radius: 5px;
            right: 10px;
            bottom: 10px;
            padding: 3px;
            border: 1px solid gray;
          }

          .tag {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            max-width: 70%;
            gap: 5px;
            z-index: 2;
          }

          .tag:hover::after {
            content: '#tag';
            position: absolute;
            font-size: 12px;
            color: black;
            background-color: beige;
            border-radius: 5px;
            top: -22px;
            right: -10px;
            padding: 3px;
            border: 1px solid gray;
          }

          .tag > button {
            padding: 1px 4px;
            font-family: BMJUA;
            color: whitesmoke;
            border-radius: 5px;
            box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.2) inset, 1px 1px 2px rgba(0, 0, 0, 0.2);
          }

          .description {
            position: relative;
            width: 200px;
            word-break: keep-all;
            padding: 5px;
            border-radius: 10px;
            box-shadow: 1px 1px 2px inset gray;
          }
        `}
      </style>
    </li>
  );
};

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
    if (footerY - (window.innerHeight - mainY) <= 0 && !isLoading && postInfo.hasMore) requestPosts(searchList, posts, postInfo.nextCursor);
  };

  const requestPosts = async (searchList: string[], posts: postsType[], postInfoNextCursor?: string) => {
    setIsLoading(true);
    const { nextCursor, hasMore, results } = await getPosts(searchList, postInfoNextCursor);
    results && setPosts([...posts, ...results]);
    setPostInfo({ nextCursor, hasMore });
    setIsLoading(false);
  };

  useEffect(() => {
    requestPosts(searchList, posts, postInfo.nextCursor);
  }, []);

  useEffect(() => {
    footerCheck();
  }, [isLoading]);

  return (
    <main onScroll={footerCheck} ref={mainRef}>
      <ul>
        {posts.map((content, i) => (
          <PostContent content={content} key={i} requestPosts={requestPosts} />
        ))}
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
            width: 14px;
          }

          main::-webkit-scrollbar-thumb {
            position: absolute;
            display: block;
            border-radius: 7px;
            border: 4px solid white;
            background-color: darkgray;
          }

          ul {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 20px;
          }

          .footer {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 225px;
            height: 300px;
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

          .footer.loading.no-content::after {
            content: '';
          }
        `}
      </style>
    </main>
  );
};

export default PostBody;
