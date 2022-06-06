import Link from 'next/link';
import { THIS_BLOG } from '@src/common/const/routes/link';
import style from './Posts.module.scss';

const Posts = () => (
  <div className={style.posts}>
    <Link href={THIS_BLOG.POSTS}>
      <a target="_blank">Go to my posts page</a>
    </Link>
  </div>
);

export default Posts;
