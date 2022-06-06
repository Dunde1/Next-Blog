import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

const MyAppRender = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
);

export default MyAppRender;
