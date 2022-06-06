import { Children, useState } from 'react';
import { InfoContentsProps } from './Info.type';
import style from './InfoContents.module.scss';

const InfoContents = ({ children, isView }: InfoContentsProps) => {
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
    <section className={`${style['contents-list']} ${isView ? '' : style.disable}`}>
      <button type="button" className={`${style.left} ${viewNumber <= 0 ? style.disable : ''}`} onClick={goLeft}>
        {'<'}
      </button>
      <button
        type="button"
        className={`${style.right} ${viewNumber >= childrenCount - 1 ? style.disable : ''}`}
        onClick={goRight}
      >
        {'>'}
      </button>
      {Children.map(children, (child, i) => (
        <div
          className={`${style.contents} ${i > viewNumber ? style.right : i < viewNumber ? style.left : ''}`}
        >
          {child}
        </div>
      ))}
    </section>
  );
};

export default InfoContents;
