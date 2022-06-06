import Link from 'next/link';
import style from './Projects.module.scss';

const Projects = () => (
  <div className={style.projects}>
    <Link href="/pages/projects">
      <a target="_blank">Go to my projects page</a>
    </Link>
  </div>
);

export default Projects;
