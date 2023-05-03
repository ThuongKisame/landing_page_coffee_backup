import '../styles/global.css';
import 'nprogress/nprogress.css';

import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';

import { CartProvider } from '@/contexts/CartContext';
import { ContactProvider } from '@/contexts/ContactContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const start = () => {
      NProgress.start();
    };
    const end = () => {
      NProgress.done();
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <>
      <ContactProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ContactProvider>
    </>
  );
};

export default MyApp;
