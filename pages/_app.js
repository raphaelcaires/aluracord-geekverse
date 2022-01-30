import { AuthProvider } from '../src/components/providers/auth';
import GlobalStyle from '../src/components/styles/GlobalStyle';
import '../src/components/chat/MessageList.css';
import ImgReact from '../src/img/react.svg';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <Head>
          <link rel="icon" href={ImgReact.src} />
        </Head>
        <Component {...pageProps} /> 
      </AuthProvider>
    </>
  );
}