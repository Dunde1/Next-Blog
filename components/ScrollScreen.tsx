import React, { Children, createRef, ReactNode, useEffect, useState } from 'react';

let isMoving = false;

const ScrollScreen = ({ children, screenDescription }: { children: ReactNode; screenDescription: string[] }) => {
  const childrenCount = Children.count(children);
  const [viewNumber, setViewNumber] = useState<number>(0);
  const screen = createRef<HTMLDivElement>();

  const moveScreen = (screenNumber: number) => {
    if (!isMoving) {
      screen.current?.scrollTo({ top: window.innerHeight * screenNumber, left: 0, behavior: 'smooth' });
      setViewNumber(screenNumber);

      isMoving = true;

      setTimeout(() => {
        isMoving = false;
      }, 1000);
    }
  };

  useEffect(() => {
    if (screen.current) {
      const $screen: HTMLDivElement = screen.current;

      const wheelEvent = (e: WheelEvent) => {
        if (e.deltaY > 0 && viewNumber < childrenCount - 1) moveScreen(viewNumber + 1);
        else if (e.deltaY < 0 && viewNumber > 0) moveScreen(viewNumber - 1);
      };

      $screen.addEventListener('wheel', wheelEvent);

      return () => {
        $screen.removeEventListener('wheel', wheelEvent);
      };
    }
  }, [viewNumber]);

  return (
    <div className="view-screen" ref={screen}>
      <nav className="scroll-buttons">
        {Children.map(children, (_, i) => (
          <button className={i === viewNumber ? 'active' : ''} onClick={() => moveScreen(i)} key={i}>
            <span>{screenDescription[i]}</span>
          </button>
        ))}
      </nav>

      {Children.map(children, (child, i) => (
        <article className="screen" key={i}>
          {child}
        </article>
      ))}

      <style jsx>
        {`
          .view-screen {
            position: relative;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }

          .screen {
            position: relative;
            width: 100vw;
            height: 100vh;
          }

          .scroll-buttons {
            position: fixed;
            display: flex;
            flex-direction: column;
            top: 50%;
            right: 10px;

            transform: translateY(-50%);

            z-index: 1;
            row-gap: 6px;
          }

          .scroll-buttons > button {
            position: relative;
            width: 12px;
            height: 12px;
            background-color: gray;
            border-radius: 50%;
            transition: background-color 0.3s;
            cursor: pointer;
          }

          .scroll-buttons > button.active {
            background-color: black;
          }

          .scroll-buttons > button > span {
            position: absolute;
            visibility: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;
            width: 100px;

            transform: translate(calc(-100% - 20px), -50%);
            border: 1px solid black;
            border-radius: 5px;
            background-color: white;
            font-size: 15px;
            opacity: 0;
            transition: opacity 0.3s;
          }

          .scroll-buttons > button > span::after {
            content: '';
            position: absolute;
            height: 10px;
            width: 10px;
            right: -6px;

            border-top: 1px solid black;
            border-right: 1px solid black;
            border-top-right-radius: 2px;
            background-color: white;
            transform: rotate(45deg);
          }

          .scroll-buttons > button:hover > span {
            opacity: 1;
            visibility: visible;
          }
        `}
      </style>
    </div>
  );
};

export default ScrollScreen;
