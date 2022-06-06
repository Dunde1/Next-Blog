import { HomeProps } from './Home.type';
import style from './Home.module.scss';

const Home = ({ visitInfo: { today, total } }: HomeProps) => (
  <div className={style.home}>
    <div className={style.logo}>
      <span data-logo="d">d</span>
      <span data-logo="u">u</span>
      <span data-logo="n">n</span>
      <span data-logo="d">d</span>
      <span data-logo="e">e</span>
    </div>
    <div className={style.visitor}>
      <span className={style['visit-counter']}>
        {today}
        <span>{' TODAY'}</span>
      </span>
      <span className={style['visit-counter']}>
        {total}
        <span>{' TOTAL'}</span>
      </span>
    </div>
  </div>
);

export default Home;
