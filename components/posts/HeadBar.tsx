import Image from 'next/image';
import Link from 'next/link';
import { createRef, KeyboardEvent, useState } from 'react';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getPosts } from '../../utils/postsUtil';
import { postInfoAtom, postsAtom, postsType } from './PostBody';

export type autocompleteType = {
  categories: string[];
  tags: string[];
};

type responseDataType = {
  results: postsType[];
  nextCursor: string | null;
  hasMore: boolean;
};

export const autoCompleteAtom = atom<autocompleteType>({ key: 'autoComplete', default: { categories: [], tags: [] } });
export const searchListAtom = atom<string[]>({ key: 'searchList', default: [] });
export const isLoadingAtom = atom<boolean>({ key: 'isLoading', default: false });

const Search = () => {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const [searchList, setSearchList] = useRecoilState(searchListAtom);
  const [message, setMessage] = useState<string>();
  const searchInputRef = createRef<HTMLInputElement>();
  const autocomplete = useRecoilValue(autoCompleteAtom);
  const setPosts = useSetRecoilState(postsAtom);
  const setPostInfo = useSetRecoilState(postInfoAtom);

  const updateData = async (searchList: string[]) => {
    setIsLoading(true);

    const { results, nextCursor, hasMore }: responseDataType = await getPosts(searchList);
    if (results) {
      setPosts([...results]);
      setPostInfo({ nextCursor, hasMore });
    }

    setIsLoading(false);
  };

  const removeSearchList = (index: number) => {
    const filterData = searchList.filter((_, i) => i !== index);
    setSearchList(filterData);
    updateData(filterData);
  };

  const sendInput = (target?: HTMLInputElement | null) => {
    if (!target || target.value === '') return setMessage('공백은 입력할 수 없습니다.');
    if (searchList.find((word) => word === target.value)) return setMessage('이미 존재합니다.');
    if (target.value.length < 3) return setMessage('3글자 이상만 검색 할 수 있습니다.');

    const newSearchList = [...searchList, target.value];
    setSearchList(newSearchList);
    setMessage('');
    target.value = '';
    updateData(newSearchList);
  };

  const enterEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendInput(e.target as HTMLInputElement);
  };

  return (
    <div className="search">
      <input type="text" ref={searchInputRef} list="search-data" onKeyPress={enterEvent} />
      <span className="message">{message}</span>
      <datalist id="search-data">
        {autocomplete.categories.map((category, i) => (
          <option value={`@${category}`} key={i} />
        ))}
        {autocomplete.tags.map((tag, i) => (
          <option value={`#${tag}`} key={i} />
        ))}
      </datalist>
      <button className={isLoading ? 'loading' : ''} onClick={() => sendInput(searchInputRef.current)}>
        <Image src="/images/posts-icon/search-circle-outline.svg" width="100%" height="100%" />
      </button>
      <ul className="search-list">
        {searchList.map((value, i) => (
          <li key={i}>
            <button onClick={() => removeSearchList(i)}>{value}</button>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .search {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 5px;
        }

        .search > input {
          width: clamp(180px, 30vw, 300px);
          height: 30px;
          border-radius: 10px;
          padding-left: 10px;
          font-family: CookieRun;
          font-size: 15px;
        }

        .search > button {
          position: relative;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          transition: box-shadow 0.3s;
        }

        .search > button:hover {
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
        }

        .search > button.loading::after {
          content: '';
          position: absolute;
          width: 35px;
          height: 35px;
          top: -2.5px;
          left: -2.5px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top: 3px solid blueviolet;
          box-sizing: border-box;
          animation: rotate-loading 1s ease-in-out infinite;
        }

        @keyframes rotate-loading {
          from {
            transform: rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg);
          }
        }

        .message {
          position: absolute;
          left: 10px;
          bottom: -16px;
          font-family: Leferi;
          font-size: 10px;
          color: red;
        }

        .search-list {
          position: absolute;
          display: flex;
          justify-content: flex-start;
          width: 25vw;
          right: 0;
          transform: translateX(110%);
          padding: 3px 2px 5px 2px;
          gap: 8px;
          align-items: center;
          overflow-x: scroll;
          overflow-y: hidden;
        }

        .search-list::-webkit-scrollbar {
          visibility: hidden;
          height: 6px;
        }

        .search-list::-webkit-scrollbar-thumb {
          display: block;
          border-radius: 3px;
          background-color: darkgray;
        }

        .search-list > li {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3px;
        }

        .search-list > li > button {
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Leferi;
          font-size: 14px;
          padding: 2px 5px;
          border-radius: 20px;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
          transition: box-shadow 0.3s;
        }

        .search-list > li > button:hover {
          box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
        }

        .search-list > li > button::after {
          content: '×';
          position: absolute;
          color: red;
          opacity: 0;
          transition: all 0.3s;
        }

        .search-list > li > button:hover::after {
          opacity: 1;
          transform: translateY(-10px);
        }
      `}</style>
    </div>
  );
};

const HeadBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <header className={`${isOpen ? 'open' : 'close'}`}>
      <div className="switch">
        <button onClick={() => setIsOpen(!isOpen)} />
        <span>◤</span>
      </div>
      <div className="logo">
        <Link href="/">
          <a target="_blank">Dunde</a>
        </Link>
      </div>
      <Search />

      <style jsx>
        {`
          header {
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            top: 0;
            border-bottom: 1.5px solid black;
            background-color: white;
            padding: 20px 0;
            transition: transform 0.3s ease-in-out;
            z-index: 1;
          }

          header.close {
            transform: translateY(-100%);
          }

          .switch {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            left: 50px;
            bottom: 0;
            width: 100px;
            height: 30px;
            transform: translateY(100%);
            box-sizing: border-box;
            border: 1.5px solid black;
            border-top: 1.5px solid white;
            border-radius: 10px;
            background-color: white;
          }

          .switch::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            transform: translateX(-100%) translateY(-1.5px) rotateZ(45deg);
            border: 1.5px solid transparent;
            border-top: 1.5px solid black;
            box-sizing: border-box;
            box-shadow: 0px -13px 0 white;
            border-radius: 50%;
          }

          .switch::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 20px;
            transform: translateX(100%) translateY(-1.5px) rotateZ(-45deg);
            border: 1.5px solid transparent;
            border-top: 1.5px solid black;
            box-sizing: border-box;
            box-shadow: 0px -13px 0 white;
            border-radius: 50%;
          }

          .switch > button {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
          }

          .switch > span {
            transition: transform 0.3s;
          }

          .open > .switch > span {
            transform: rotateZ(45deg);
          }

          .close > .switch > span {
            transform: rotateZ(-135deg);
          }

          .logo {
            position: absolute;
            left: 20px;
            border-radius: 30px;
            padding: 5px 10px;
            transition: box-shadow 0.3s;
          }

          .logo:hover {
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
          }

          .logo a {
            font-family: sandol-outline;
            font-size: 30px;
          }
        `}
      </style>
    </header>
  );
};

export default HeadBar;
