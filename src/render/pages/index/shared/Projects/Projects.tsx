import Link from 'next/link';
import { THIS_BLOG } from '@src/common/const/routes/link';
import style from './Projects.module.scss';

const Projects = () => (
  <div className={style.projects}>
    <Link href={THIS_BLOG.PROJECTS}>
      <a target="_blank">Go to my projects page</a>
    </Link>
  </div>
);

export default Projects;
