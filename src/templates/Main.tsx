import type { ReactNode } from 'react';

import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
// import { CartProvider } from '@/contexts/CartContext';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="mt-16 w-full text-gray-700 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Navbar />
    <div className="min-h-[calc(100vh-4rem)]">{props.children}</div>
    <Footer />
  </div>
);

export { Main };
