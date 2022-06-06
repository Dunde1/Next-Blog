import { NextPage } from 'next';
import { ErrorProps } from '@src/common/types/pageProps/_error.type';
import { THIS_BLOG } from '@src/common/const/routes/link';
import style from './_error.module.scss';

const ErrorRender: NextPage<ErrorProps> = ({ statusCode }) => (
  <div className={style.error}>
    <h1>
      this is error page, code:
      {statusCode}
    </h1>
    <button type="button" onClick={() => (window.location.href = THIS_BLOG.MAIN)}> back to main</button>
  </div>
);

export default ErrorRender;
