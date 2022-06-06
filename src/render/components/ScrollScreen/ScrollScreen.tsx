import React, { Children, cloneElement, createRef, isValidElement, useEffect, useState } from 'react';
import { ScrollScreenProps } from '@render/components/ScrollScreen/ScrollScreen.type';
import style from './ScrollScreen.module.scss';

let isMoving = false;

const ScrollScreen = ({ children, screenDescription }: ScrollScreenProps) => {
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
    return () => {
    };
  }, [viewNumber]);

  return (
    <div className={style['view-screen']} ref={screen}>
      <nav className={style['scroll-buttons']}>
        {Children.map(children, (_, i) => (
          <button
            type="button"
            className={i === viewNumber ? style.active : ''}
            onClick={() => moveScreen(i)}
            key={screenDescription[i]}
          >
            <span>{screenDescription[i]}</span>
          </button>
        ))}
      </nav>

      {Children.map(children, (child, i) => (
        <article
          className={`${style.screen} ${i <= viewNumber ? style.view : ''} ${i < viewNumber ? style.far : ''}`}
          key={screenDescription[i]}
        >
          {isValidElement(child) ? cloneElement(child, { isView: i === viewNumber }) : ''}
        </article>
      ))}
    </div>
  );
};

export default ScrollScreen;
