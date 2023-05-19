import '../styles/global.css';
import 'nprogress/nprogress.css';

import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';

import Maintenance from '@/components/common/Maintenance';
import { CartProvider } from '@/contexts/CartContext';
import { ContactProvider } from '@/contexts/ContactContext';
import { getActive } from '@/libs/getData';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  useEffect(() => {
    getActive()
      .then((data) => {
        if (data.isActive) {
          setIsActive(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
  }, [isActive]);

  return (
    <>
      {!isActive ? (
        <Maintenance />
      ) : (
        <>
          <ContactProvider>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </ContactProvider>
        </>
      )}
    </>
  );
};

export default MyApp;
