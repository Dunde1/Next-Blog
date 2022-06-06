import Link from 'next/link';
import style from './Posts.module.scss';

const Posts = () => (
  <div className={style.posts}>
    <Link href="/pages/posts">
      <a target="_blank">Go to my posts page</a>
    </Link>
  </div>
);

export default Posts;
