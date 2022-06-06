import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IMAGES } from '@src/common/const/routes/file';
import { MY } from '@src/common/const/routes/link';
import InfoContents from './InfoContents';
import style from './Info.module.scss';

const Info = () => {
  const [viewToggle, setViewToggle] = useState<boolean>(false);

  return (
    <div className={`${style.info} ${viewToggle ? style.detail : style.simple}`}>
      <section className={style['img-background']}>
        <div>
          <Image
            src={IMAGES.WALLPAPER}
            layout="fill"
            objectFit="cover"
            alt="profile-wallpaper-img"
            priority
          />
        </div>
      </section>
      <section className={style['img-profile']} data-view="CLICK TO VIEW CHANGE">
        <button aria-label="view-toggle" type="button" onClick={() => setViewToggle(!viewToggle)} />
        <div>
          <Image src={IMAGES.PROFILE} layout="fill" objectFit="cover" alt="profile-img" />
        </div>
      </section>
      <InfoContents isView={viewToggle}>
        <ul className={style['tech-list']} data-title="TECH-STACK">
          <li data-tech="javascript">
            <Image src={IMAGES.TECH_STACKS.JAVASCRIPT} layout="fill" objectFit="cover" alt="javascript" />
          </li>
          <li data-tech="typescript">
            <Image src={IMAGES.TECH_STACKS.TYPESCRIPT} layout="fill" objectFit="cover" alt="typescript" />
          </li>
          <li data-tech="react">
            <Image src={IMAGES.TECH_STACKS.REACT_JS} layout="fill" objectFit="cover" alt="reactjs" />
          </li>
          <li data-tech="nextjs">
            <Image src={IMAGES.TECH_STACKS.NEXT_JS} layout="fill" objectFit="cover" alt="nextjs" />
          </li>
          <li data-tech="github">
            <Image src={IMAGES.TECH_STACKS.GITHUB} layout="fill" objectFit="cover" alt="github" />
          </li>
        </ul>
        <ul className={style['history-list']} data-title="TECH-HISTORY">
          <li>
            <span className={style.date}>2014. 5. ~ 2018. 4.</span>
            <span className={style.description}>공군 부사관</span>
          </li>
          <li>
            <span className={style.date}>2016. 3. ~ 2021. 2.</span>
            <span className={style.description}>한양사이버대</span>
          </li>
          <li>
            <span className={style.date}>2020. 11. ~ 2021. 5.</span>
            <span className={style.description}>개발자 양성 학원</span>
          </li>
          <li>
            <span className={style.date}>2021. 6. 2.</span>
            <span className={style.description}>정보처리기사 합격</span>
          </li>
          <li>
            <span className={style.date}>2021. 7. ~ 2021. 12.</span>
            <span className={style.description}>부스트캠프</span>
          </li>
        </ul>
        <ul className={style['link-list']} data-title="MY LINK">
          <li>
            <Link href={MY.GITHUB}>
              <a target="_blank">github</a>
            </Link>
          </li>
          <li>
            <Link href={MY.GITHUB_BLOG}>
              <a target="_blank">github page</a>
            </Link>
          </li>
          <li>
            <Link href={MY.VELOG}>
              <a target="_blank">velog</a>
            </Link>
          </li>
        </ul>
        <ul className={style['project-list']} data-title="PROJECT">
          <li>
            <Link href={MY.PROJECT.LIARKING}>
              <a target="_blank">Liar King</a>
            </Link>
          </li>
        </ul>
      </InfoContents>
    </div>
  );
};

export default Info;
