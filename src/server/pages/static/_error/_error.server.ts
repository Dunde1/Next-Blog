import { NextPage } from 'next';
import { ErrorProps } from '@src/common/types/pageProps/_error.type';

const ErrorServer: NextPage<ErrorProps>['getInitialProps'] = ({ res, err }) => {
  const statusCode = res?.statusCode ?? (err ? err.statusCode : 404);
  return { statusCode };
};

export default ErrorServer;
