import Image from 'next/image';
import Link from 'next/link';
import { Children, ReactNode, useState } from 'react';

const Contents = ({ children, isView }: { children: ReactNode; isView: boolean }) => {
  const childrenCount = Children.count(children);
  const [viewNumber, setViewNumber] = useState<number>(0);
  const goLeft = () => {
    if (viewNumber <= 0) return;
    setViewNumber(viewNumber - 1);
  };
  const goRight = () => {
    if (viewNumber >= childrenCount - 1) return;
    setViewNumber(viewNumber + 1);
  };

  return (
    <section className={`contents-list ${isView ? '' : 'disable'}`}>
      <button className={`left ${viewNumber <= 0 ? 'disable' : ''}`} onClick={goLeft}>
        {'<'}
      </button>
      <button className={`right ${viewNumber >= childrenCount - 1 ? 'disable' : ''}`} onClick={goRight}>
        {'>'}
      </button>
      {Children.map(children, (child, i) => (
        <div className={`contents ${i > viewNumber ? 'right' : i < viewNumber ? 'left' : ''}`}>{child}</div>
      ))}

      <style jsx>{`
        .contents-list {
          position: relative;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 50vw;
          height: 70vh;
          border-radius: 20px;
          background-color: rgba(0, 0, 0, 0.5);
          transform: scale(1);
          overflow: hidden;
          transition: transform 1s, background-color 0.2s;
        }

        .contents-list:hover {
          background-color: rgba(0, 0, 0, 0.8);
          z-index: 2;
        }

        .contents-list.disable {
          transform: scale(0);
        }

        .contents {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          gap: 50px;
          width: 100%;
          height: 100%;
          padding-top: 60px;
          opacity: 1;
          transition: all 0.5s ease-in-out;
        }

        .contents.left {
          opacity: 0;
          transform: translateX(-100%);
        }

        .contents.right {
          opacity: 0;
          transform: translateX(100%);
        }

        .contents-list > button {
          position: absolute;
          color: azure;
          font-family: BR;
          font-size: 50px;
          cursor: pointer;
          z-index: 1;
          transition: color 0.1s;
        }

        .contents-list > button.disable {
          filter: blur(1px);
          cursor: default;
          color: gray !important;
        }

        .contents-list > button:hover {
          color: steelblue;
        }

        button.left {
          left: 10px;
        }

        button.right {
          right: 10px;
        }
      `}</style>
    </section>
  );
};

const Info = () => {
  const [viewToggle, setViewToggle] = useState<boolean>(false);

  return (
    <>
      <div className={`info ${viewToggle ? 'detail' : 'simple'}`}>
        <section className="img-background">
          <div>
            <Image src="/images/wallpaper.jpg" layout="fill" objectFit="cover" alt="profile-wallpaper-img" priority={true} />
          </div>
        </section>
        <section className="img-profile" data-view="CLICK TO VIEW CHANGE">
          <button onClick={() => setViewToggle(!viewToggle)} />
          <div>
            <Image src="/images/profile.jpg" layout="fill" objectFit="cover" alt="profile-img" />
          </div>
        </section>
        <Contents isView={viewToggle}>
          <ul className="tech-list" data-title="TECH-STACK">
            <li data-tech="javascript">
              <Image src="/images/tech-stack/javascript.png" layout="fill" objectFit="cover" alt="javascript" />
            </li>
            <li data-tech="typescript">
              <Image src="/images/tech-stack/typescript.png" layout="fill" objectFit="cover" alt="typescript" />
            </li>
            <li data-tech="react">
              <Image src="/images/tech-stack/reactjs.png" layout="fill" objectFit="cover" alt="reactjs" />
            </li>
            <li data-tech="github">
              <Image src="/images/tech-stack/github.png" layout="fill" objectFit="cover" alt="github" />
            </li>
          </ul>
          <ul className="history-list" data-title="TECH-HISTORY">
            <li>
              <span className="date">2014. 5. ~ 2018. 4.</span>
              <span className="description">공군 부사관</span>
            </li>
            <li>
              <span className="date">2016. 3. ~ 2021. 2.</span>
              <span className="description">한양사이버대</span>
            </li>
            <li>
              <span className="date">2020. 11. ~ 2021. 5.</span>
              <span className="description">개발자 양성 학원</span>
            </li>
            <li>
              <span className="date">2021. 6. 2.</span>
              <span className="description">정보처리기사 합격</span>
            </li>
            <li>
              <span className="date">2021. 7. ~ 2021. 12.</span>
              <span className="description">부스트캠프</span>
            </li>
          </ul>
          <ul className="link-list" data-title="MY LINK">
            <li>
              <Link href="https://github.com/Dunde1">
                <a target="_blank">github</a>
              </Link>
            </li>
            <li>
              <Link href="https://Dunde1.github.io/">
                <a target="_blank">github page</a>
              </Link>
            </li>
            <li>
              <Link href="https://velog.io/@dunde">
                <a target="_blank">velog</a>
              </Link>
            </li>
          </ul>
        </Contents>
      </div>

      <style jsx>
        {`
          .info {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: rgb(187, 187, 187);
          }

          .img-background {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            transition: all 1s;
          }

          .detail > .img-background {
            border: 5px solid whitesmoke;
            filter: brightness(0.6) blur(5px) grayscale(0.3);
          }

          .simple > .img-background {
            border: none;
            filter: brightness(1) blur(0) grayscale(1);
          }

          .img-profile {
            position: absolute;
            overflow: hidden;
            z-index: 2;
            transition: all 1s;
          }

          .img-profile::after {
            content: attr(data-view);
            position: absolute;
            width: 100%;
            height: 100%;
            font-family: paybooc;
            color: whitesmoke;
            transition: all 1s;
          }

          .detail > .img-profile {
            width: clamp(300px, 30vw, 400px);
            height: clamp(300px, 30vw, 400px);
            top: 5vw;
            left: 5vw;
            border: 8px solid whitesmoke;
            border-radius: 0 50% 50% 50%;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
            filter: grayscale(1);
          }

          .detail > .img-profile::after {
            font-size: clamp(20px, 2vw, 27px);
            transform: translate(8%, 50%);
          }

          .simple > .img-profile {
            width: min(70vw, 70vh);
            height: min(70vw, 70vh);
            top: 15vh;
            left: 15vw;
            border-top: 5vw solid whitesmoke;
            border-bottom: 5vw solid whitesmoke;
            border-radius: 20px;
            box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.8);
            filter: grayscale(0);
          }

          .simple > .img-profile::after {
            font-size: min(5vw, 5vh);
            transform: translate(5%, 80%);
          }

          .img-profile > div,
          .img-profile > button,
          .img-background > div {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .img-profile > button {
            cursor: pointer;
            border-radius: 50%;
            z-index: 1;
          }

          ul {
            padding-top: 100px;
          }

          .tech-list {
            position: relative;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
            height: 100%;
            gap: 20px;
          }

          ul::before {
            position: absolute;
            top: 0;
            content: attr(data-title);
            font-family: sandol;
            font-size: 30px;
            color: whitesmoke;
          }

          .tech-list > li {
            position: relative;
            width: 50px;
            height: 50px;
            border-radius: 10px;
            overflow: hidden;
          }

          .history-list {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            gap: 20px;
            color: aliceblue;
          }

          .history-list > li {
            display: flex;
            justify-content: space-between;
            width: 70%;
            gap: 20px;
          }

          .history-list > li > .date::before {
            content: '▸ ';
          }

          .history-list > li > span {
            font-family: Cafe24Ssurround;
          }

          .link-list {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 20px;
          }

          .link-list > li {
            font-family: netmarble;
            font-size: 20px;
            text-transform: uppercase;
            color: aliceblue;
            transition: all 0.3s;
          }

          .link-list > li:hover {
            color: violet;
          }
        `}
      </style>
    </>
  );
};

export default Info;
